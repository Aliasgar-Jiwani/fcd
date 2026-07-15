import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import QUESTIONS, { TOPICS } from './data/questions'
import { dbGet, dbSet, dbDelete, subscribeToQuizState } from './lib/db'
import './index.css'

const BAR_COLORS = ['#818cf8', '#f59e0b', '#34d399', '#fb7185']
const OPT_KEYS = ['A', 'B', 'C', 'D']

// Unique student ID for this browser tab (JS variable, never persisted)
const STUDENT_ID = 'sid_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36)

// ═══════════════════════════════════════════════════════════
// VOTE TALLYING
// ═══════════════════════════════════════════════════════════
function tallyVotes(votes, optionCount) {
  const tallies = new Array(optionCount).fill(0)
  if (!votes || typeof votes !== 'object') return tallies
  for (const sid of Object.keys(votes)) {
    const idx = votes[sid]
    if (typeof idx === 'number' && idx >= 0 && idx < optionCount) tallies[idx]++
  }
  return tallies
}

// ═══════════════════════════════════════════════════════════
// TOPBAR
// ═══════════════════════════════════════════════════════════
function Topbar({ question, qIndex, total, connected }) {
  return (
    <div className="topbar">
      <span className="round-badge">
        <span className="dot" />
        Round {question.round}
      </span>
      <span className="q-counter">
        Question {qIndex + 1} of {total}
      </span>
      <span
        className={`sync-dot ${connected ? 'connected' : 'disconnected'}`}
        title={connected ? 'Live sync active' : 'Reconnecting…'}
      />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// LANDING
// ═══════════════════════════════════════════════════════════
function Landing({ onChoose }) {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleTeacherLogin = (e) => {
    e.preventDefault()
    if (password === 'Aliasgar@1214') {
      onChoose('teacher')
    } else {
      setError(true)
      setPassword('')
    }
  }

  return (
    <div className="landing">
      <div className="landing-card">
        <div className="landing-icon">🎓</div>
        <h1 className="landing-title">Classroom Quiz</h1>
        <p className="landing-sub">Real-time quiz game — no login required</p>
        
        {showPassword ? (
          <form className="password-form" onSubmit={handleTeacherLogin}>
            <p className="password-label">Teacher Password</p>
            <input 
              type="password" 
              autoFocus 
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              className={`password-input ${error ? 'error' : ''}`}
              placeholder="Enter password"
            />
            {error && <p className="password-error">Incorrect password</p>}
            <div className="password-actions">
              <button type="button" className="btn btn-danger-ghost" onClick={() => { setShowPassword(false); setError(false); setPassword(''); }}>Cancel</button>
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>
        ) : (
          <div className="role-buttons">
            <button className="role-btn" id="btn-teacher" onClick={() => setShowPassword(true)}>
              <span className="role-emoji">🖥️</span>
              I'm the Teacher
              <span className="role-label">Project on the big screen</span>
            </button>
            <button className="role-btn" id="btn-student" onClick={() => onChoose('student')}>
              <span className="role-emoji">📱</span>
              I'm a Student
              <span className="role-label">Vote from my phone</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// TOPIC SELECTOR (Teacher picks topics before starting quiz)
// ═══════════════════════════════════════════════════════════
function TopicSelector({ sessionTopics, onStart }) {
  const [selected, setSelected] = useState(() => {
    if (sessionTopics && sessionTopics.length > 0) {
      return new Set(sessionTopics)
    }
    return new Set(TOPICS.map(t => t.key))
  })

  const toggle = (key) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const selectAll = () => setSelected(new Set(TOPICS.map(t => t.key)))
  const selectNone = () => setSelected(new Set())

  const questionCount = QUESTIONS.filter(q => selected.has(q.topic)).length

  return (
    <div className="screen">
      <div className="topbar">
        <span className="round-badge"><span className="dot" /> Setup</span>
        <span className="q-counter">{selected.size} of {TOPICS.length} topics selected</span>
      </div>
      <div className="main-content">
        <div className="topic-header">
          <h2 className="topic-heading">Select Topics</h2>
          <p className="topic-subtitle">Choose which topics to include in today's quiz</p>
          <div className="topic-bulk-actions">
            <button className="btn btn-ghost btn-sm" onClick={selectAll}>✓ Select All</button>
            <button className="btn btn-ghost btn-sm" onClick={selectNone}>✗ Clear All</button>
          </div>
        </div>
        <div className="topic-grid">
          {TOPICS.map(topic => {
            const count = QUESTIONS.filter(q => q.topic === topic.key).length
            const isActive = selected.has(topic.key)
            return (
              <button
                key={topic.key}
                className={`topic-card ${isActive ? 'active' : ''}`}
                onClick={() => toggle(topic.key)}
                style={{ '--topic-color': topic.color }}
              >
                <span className="topic-icon">{topic.icon}</span>
                <span className="topic-name">{topic.title}</span>
                <span className="topic-desc">{topic.description}</span>
                <span className="topic-count">{count} question{count !== 1 ? 's' : ''}</span>
                {isActive && <span className="topic-check">✓</span>}
              </button>
            )
          })}
        </div>
      </div>
      <div className="controls">
        <button
          className="btn btn-primary"
          disabled={selected.size === 0}
          onClick={() => onStart([...selected])}
        >
          🚀 Start Quiz — {questionCount} question{questionCount !== 1 ? 's' : ''}
        </button>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// TEACHER VIEW
// ═══════════════════════════════════════════════════════════
function TeacherView({ session, votes, connected, questions, onReveal, onNext, onReset, onChangeTopics }) {
  const idx = session.index
  const revealed = session.revealed
  const total = questions.length
  const isComplete = idx >= total

  if (isComplete) {
    const lastQ = questions[total - 1]
    return (
      <div className="screen">
        {lastQ && <Topbar question={lastQ} qIndex={total - 1} total={total} connected={connected} />}
        <div className="main-content">
          <div className="complete-card">
            <div className="complete-icon">🎉</div>
            <h2 className="complete-title">Quiz Complete!</h2>
            <p className="complete-sub">Great work, everyone!</p>
          </div>
        </div>
        <div className="controls">
          <button className="btn btn-primary" onClick={onChangeTopics}>📋 Change Topics</button>
          <span className="spacer" />
          <button className="btn btn-danger-ghost" onClick={onReset}>↻ Restart Quiz</button>
        </div>
      </div>
    )
  }

  const q = questions[idx]
  if (!q) return null
  const tallies = tallyVotes(votes, q.options.length)
  const totalVotes = tallies.reduce((a, b) => a + b, 0)
  const maxTally = Math.max(...tallies, 1)
  const isItemName = q.topic === 'computer-or-not'
  const hasCorrect = q.correct !== null
  const isLast = idx === total - 1

  return (
    <div className="screen">
      <Topbar question={q} qIndex={idx} total={total} connected={connected} />
      <div className="main-content">
        <div className="question-card">
          <div className="round-title">Round {q.round} — {q.roundTitle}</div>
          <div className={`question-text ${isItemName ? 'item-name' : ''}`}>
            {isItemName ? q.text : `\u201C${q.text}\u201D`}
          </div>
          {q.description && (
            <p className="question-desc">{q.description}</p>
          )}
        </div>

        {revealed && hasCorrect && (
          <div className="revealed-banner has-answer">✅ Answer revealed — {q.options[q.correct]}</div>
        )}
        {revealed && q.explanation && (
          <div className="explanation-card">{q.explanation}</div>
        )}

        <div className="results-section">
          <div className="results-header">
            <span className="results-title">Live Results</span>
            <span className="vote-total">{totalVotes} vote{totalVotes !== 1 ? 's' : ''}</span>
          </div>
          {q.options.map((opt, i) => {
            const count = tallies[i]
            const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0
            const widthPct = totalVotes > 0 ? (count / maxTally) * 100 : 0
            const color = BAR_COLORS[i % BAR_COLORS.length]
            let rowClass = 'bar-row'
            if (revealed && hasCorrect) {
              rowClass += i === q.correct ? ' correct' : ' incorrect'
            }
            return (
              <div className={rowClass} key={i}>
                <span className="bar-label">{opt}</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${widthPct}%`, background: color }}>
                    {count > 0 && <span className="bar-count">{count}</span>}
                    {count > 0 && <span className="bar-pct">{pct}%</span>}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="controls">
        <button className="btn btn-success" disabled={revealed} onClick={onReveal}>
          ✦ Reveal Answer
        </button>
        <button className="btn btn-primary" disabled={!revealed} onClick={onNext}>
          {isLast ? '🏁 Finish Quiz' : '→ Next Question'}
        </button>
        <span className="spacer" />
        <button className="btn btn-ghost btn-sm" onClick={onChangeTopics}>📋 Topics</button>
        <button className="btn btn-danger-ghost" onClick={onReset}>↻ Reset</button>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// STUDENT VIEW
// ═══════════════════════════════════════════════════════════
function StudentView({ session, myVote, connected, questions, onVote }) {
  const idx = session.index
  const revealed = session.revealed
  const total = questions.length
  const isComplete = idx >= total

  if (isComplete) {
    return (
      <div className="screen">
        <div className="main-content" style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div className="complete-card">
            <div className="complete-icon">🎉</div>
            <h2 className="complete-title">Quiz Complete!</h2>
            <p className="complete-sub">Thanks for playing!</p>
          </div>
        </div>
      </div>
    )
  }

  const q = questions[idx]
  if (!q) return null
  const isItemName = q.topic === 'computer-or-not'
  const hasCorrect = q.correct !== null
  const hasVoted = myVote !== null

  function getButtonClass(i) {
    let cls = 'vote-btn'
    if (revealed) {
      if (hasCorrect) {
        cls += i === q.correct ? ' revealed-correct' : ' revealed-incorrect'
        if (i === myVote) cls += ' selected'
      } else {
        cls += i === myVote ? ' selected' : ' locked'
      }
    } else if (hasVoted) {
      cls += i === myVote ? ' selected locked' : ' locked'
    }
    return cls
  }

  return (
    <div className="screen">
      <Topbar question={q} qIndex={idx} total={total} connected={connected} />
      <div className="main-content">
        <div className="question-card">
          <div className="round-title">Round {q.round} — {q.roundTitle}</div>
          <div className={`question-text ${isItemName ? 'item-name' : ''}`}>
            {isItemName ? q.text : `\u201C${q.text}\u201D`}
          </div>
          {q.description && (
            <p className="question-desc">{q.description}</p>
          )}
        </div>

        <div className="vote-options">
          {q.options.map((opt, i) => (
            <button
              key={i}
              id={`vote-opt-${i}`}
              className={getButtonClass(i)}
              disabled={hasVoted || revealed}
              onClick={() => onVote(i)}
            >
              <span className="opt-key">{OPT_KEYS[i] || i + 1}</span>
              {opt}
            </button>
          ))}
        </div>

        {hasVoted && !revealed && (
          <div className="locked-banner">
            <span className="check">✓</span> Vote locked in
          </div>
        )}
        {revealed && hasCorrect && (() => {
          const correct = myVote === q.correct
          return (
            <div
              className="locked-banner"
              style={{
                background: correct ? 'rgba(52,211,153,0.1)' : 'rgba(251,113,133,0.1)',
                borderColor: correct ? 'rgba(52,211,153,0.2)' : 'rgba(251,113,133,0.2)',
                color: correct ? 'var(--success)' : 'var(--danger)'
              }}
            >
              <span className="check" style={{ background: correct ? 'var(--success)' : 'var(--danger)' }}>
                {correct ? '✓' : '✗'}
              </span>
              {correct ? 'Correct!' : `The answer was: ${q.options[q.correct]}`}
            </div>
          )
        })()}
        {revealed && q.explanation && (
          <div className="explanation-card">{q.explanation}</div>
        )}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// STUDENT WAITING
// ═══════════════════════════════════════════════════════════
function StudentWaiting({ connected }) {
  return (
    <div className="screen">
      <div className="topbar">
        <span className="round-badge"><span className="dot" /> Waiting</span>
        <span className={`sync-dot ${connected ? 'connected' : 'disconnected'}`} />
      </div>
      <div className="main-content" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div className="waiting-card">
          <div className="waiting-icon">📡</div>
          <p className="waiting-text">Waiting for the teacher to start the quiz…</p>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// HELPER: Build filtered question list with dynamic round #
// ═══════════════════════════════════════════════════════════
function buildFilteredQuestions(topicKeys) {
  if (!topicKeys || topicKeys.length === 0) return []
  // Ensure topics are in canonical TOPICS order
  const orderedTopics = TOPICS.map(t => t.key).filter(k => topicKeys.includes(k))
  return QUESTIONS
    .filter(q => orderedTopics.includes(q.topic))
    .map(q => ({
      ...q,
      round: orderedTopics.indexOf(q.topic) + 1,
      roundTitle: TOPICS.find(t => t.key === q.topic)?.title || ''
    }))
}

// ═══════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════
export default function App() {
  const [role, setRole] = useState(null)
  const [session, setSession] = useState({ index: 0, revealed: false })
  const [votes, setVotes] = useState({})
  const [myVote, setMyVote] = useState(null)
  const [connected, setConnected] = useState(false)
  const [hasSession, setHasSession] = useState(false)
  const [selectedTopics, setSelectedTopics] = useState(null)

  const lastQIndexRef = useRef(-1)
  const unsubRef = useRef(null)
  const pollRef = useRef(null)

  // Compute filtered questions based on selected topics
  const filteredQuestions = useMemo(
    () => buildFilteredQuestions(selectedTopics),
    [selectedTopics]
  )

  // ─── Refresh state from Supabase ───
  const refreshState = useCallback(async () => {
    const s = await dbGet('session:currentQuestion')
    if (!s) {
      setHasSession(false)
      return
    }
    setHasSession(true)
    setSession(s)

    // Sync topics from session (important for students)
    if (s.topics && s.topics.length > 0) {
      setSelectedTopics(s.topics)
    }

    const v = (await dbGet('votes:q' + s.index)) || {}
    setVotes(v)

    // If question changed for student, reset or restore local vote
    if (s.index !== lastQIndexRef.current) {
      lastQIndexRef.current = s.index
      if (v[STUDENT_ID] !== undefined) {
        setMyVote(v[STUDENT_ID])
      } else {
        setMyVote(null)
      }
    }
  }, [])

  // ─── Role selection handler ───
  const handleChooseRole = useCallback(async (r) => {
    setRole(r)

    if (r === 'teacher') {
      const existing = await dbGet('session:currentQuestion')
      if (existing && existing.topics && existing.topics.length > 0) {
        // Resume existing session with its topics
        setSelectedTopics(existing.topics)
      }
      // else: selectedTopics stays null → TopicSelector shown
    }

    await refreshState()

    // Subscribe to realtime
    unsubRef.current = subscribeToQuizState(
      () => refreshState(),
      (status) => {
        setConnected(status === 'SUBSCRIBED')
      }
    )

    // Fallback poll every 3s
    pollRef.current = setInterval(refreshState, 3000)
  }, [refreshState])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (unsubRef.current) unsubRef.current()
      if (pollRef.current) clearInterval(pollRef.current)
    }
  }, [])

  // ─── Teacher: Start quiz with selected topics ───
  const handleStartQuiz = useCallback(async (topics) => {
    setSelectedTopics(topics)
    // Clear all possible previous votes
    for (let i = 0; i < QUESTIONS.length; i++) {
      await dbDelete('votes:q' + i)
    }
    const newSession = { index: 0, revealed: false, topics }
    await dbSet('session:currentQuestion', newSession)
    setSession(newSession)
    setVotes({})
    setMyVote(null)
    lastQIndexRef.current = 0
  }, [])

  // ─── Teacher actions ───
  const handleReveal = useCallback(async () => {
    const s = (await dbGet('session:currentQuestion')) || session
    const newSession = { ...s, revealed: true }
    await dbSet('session:currentQuestion', newSession)
    setSession(newSession)
  }, [session])

  const handleNext = useCallback(async () => {
    const s = (await dbGet('session:currentQuestion')) || session
    const nextIdx = s.index + 1
    const newSession = { ...s, index: nextIdx, revealed: false }
    await dbSet('session:currentQuestion', newSession)
    setSession(newSession)
    lastQIndexRef.current = nextIdx
    const v = (await dbGet('votes:q' + nextIdx)) || {}
    setVotes(v)
  }, [session])

  const handleReset = useCallback(async () => {
    // Restart quiz with same topics
    const topics = selectedTopics || []
    for (let i = 0; i < QUESTIONS.length; i++) {
      await dbDelete('votes:q' + i)
    }
    const newSession = { index: 0, revealed: false, topics }
    await dbSet('session:currentQuestion', newSession)
    setSession(newSession)
    setVotes({})
    setMyVote(null)
    lastQIndexRef.current = 0
  }, [selectedTopics])

  const handleChangeTopics = useCallback(async () => {
    // Clear session and go back to topic selector
    for (let i = 0; i < QUESTIONS.length; i++) {
      await dbDelete('votes:q' + i)
    }
    await dbDelete('session:currentQuestion')
    setSession({ index: 0, revealed: false })
    setVotes({})
    setMyVote(null)
    setHasSession(false)
    lastQIndexRef.current = 0
    setSelectedTopics(null)
  }, [])

  // ─── Student action ───
  const handleVote = useCallback(async (optionIndex) => {
    if (myVote !== null || session.revealed) return
    setMyVote(optionIndex)

    const voteKey = 'votes:q' + session.index
    const existing = (await dbGet(voteKey)) || {}
    existing[STUDENT_ID] = optionIndex
    await dbSet(voteKey, existing)
    setVotes(existing)
  }, [myVote, session])

  // ─── Render ───
  if (!role) {
    return <Landing onChoose={handleChooseRole} />
  }

  if (role === 'teacher') {
    // Show topic selector if no topics chosen yet
    if (!selectedTopics || selectedTopics.length === 0) {
      return <TopicSelector sessionTopics={session?.topics} onStart={handleStartQuiz} />
    }
    return (
      <>
        <TeacherView
          session={session}
          votes={votes}
          connected={connected}
          questions={filteredQuestions}
          onReveal={handleReveal}
          onNext={handleNext}
          onReset={handleReset}
          onChangeTopics={handleChangeTopics}
        />
        <div className={`conn-toast ${!connected ? 'show' : ''}`}>
          ⚠ Reconnecting to server…
        </div>
      </>
    )
  }

  // Student
  if (!hasSession || filteredQuestions.length === 0) {
    return (
      <>
        <StudentWaiting connected={connected} />
        <div className={`conn-toast ${!connected ? 'show' : ''}`}>
          ⚠ Reconnecting to server…
        </div>
      </>
    )
  }

  return (
    <>
      <StudentView
        session={session}
        myVote={myVote}
        connected={connected}
        questions={filteredQuestions}
        onVote={handleVote}
      />
      <div className={`conn-toast ${!connected ? 'show' : ''}`}>
        ⚠ Reconnecting to server…
      </div>
    </>
  )
}
