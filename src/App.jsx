import { useState, useEffect, useRef, useCallback } from 'react'
import QUESTIONS from './data/questions'
import { dbGet, dbSet, dbDelete, subscribeToQuizState } from './lib/db'
import './index.css'

const TOTAL = QUESTIONS.length
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
function Topbar({ question, qIndex, connected }) {
  return (
    <div className="topbar">
      <span className="round-badge">
        <span className="dot" />
        Round {question.round}
      </span>
      <span className="q-counter">
        Question {qIndex + 1} of {TOTAL}
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
// TEACHER VIEW
// ═══════════════════════════════════════════════════════════
function TeacherView({ session, votes, connected, onReveal, onNext, onReset }) {
  const idx = session.index
  const revealed = session.revealed
  const isComplete = idx >= TOTAL

  if (isComplete) {
    return (
      <div className="screen">
        <Topbar question={QUESTIONS[TOTAL - 1]} qIndex={TOTAL - 1} connected={connected} />
        <div className="main-content">
          <div className="complete-card">
            <div className="complete-icon">🎉</div>
            <h2 className="complete-title">Quiz Complete!</h2>
            <p className="complete-sub">Great work, everyone!</p>
          </div>
        </div>
        <div className="controls">
          <button className="btn btn-danger-ghost" onClick={onReset}>↻ Reset Session</button>
        </div>
      </div>
    )
  }

  const q = QUESTIONS[idx]
  const tallies = tallyVotes(votes, q.options.length)
  const totalVotes = tallies.reduce((a, b) => a + b, 0)
  const maxTally = Math.max(...tallies, 1)
  const isRound1 = q.round === 1
  const hasCorrect = q.correct !== null
  const isLast = idx === TOTAL - 1

  return (
    <div className="screen">
      <Topbar question={q} qIndex={idx} connected={connected} />
      <div className="main-content">
        <div className="question-card">
          <div className="round-title">Round {q.round} — {q.roundTitle}</div>
          <div className={`question-text ${isRound1 ? 'item-name' : ''}`}>
            {isRound1 ? q.text : `\u201C${q.text}\u201D`}
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
        <button className="btn btn-danger-ghost" onClick={onReset}>↻ Reset</button>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// STUDENT VIEW
// ═══════════════════════════════════════════════════════════
function StudentView({ session, myVote, connected, onVote }) {
  const idx = session.index
  const revealed = session.revealed
  const isComplete = idx >= TOTAL

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

  const q = QUESTIONS[idx]
  const isRound1 = q.round === 1
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
      <Topbar question={q} qIndex={idx} connected={connected} />
      <div className="main-content">
        <div className="question-card">
          <div className="round-title">Round {q.round} — {q.roundTitle}</div>
          <div className={`question-text ${isRound1 ? 'item-name' : ''}`}>
            {isRound1 ? q.text : `\u201C${q.text}\u201D`}
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
// MAIN APP
// ═══════════════════════════════════════════════════════════
export default function App() {
  const [role, setRole] = useState(null)
  const [session, setSession] = useState({ index: 0, revealed: false })
  const [votes, setVotes] = useState({})
  const [myVote, setMyVote] = useState(null)
  const [connected, setConnected] = useState(false)
  const [hasSession, setHasSession] = useState(false)

  const lastQIndexRef = useRef(-1)
  const unsubRef = useRef(null)
  const pollRef = useRef(null)

  // ─── Refresh state from Supabase ───
  const refreshState = useCallback(async () => {
    const s = await dbGet('session:currentQuestion')
    if (!s) {
      setHasSession(false)
      return
    }
    setHasSession(true)
    setSession(s)

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
      if (!existing) {
        await dbSet('session:currentQuestion', { index: 0, revealed: false })
      }
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

  // ─── Teacher actions ───
  const handleReveal = useCallback(async () => {
    const s = (await dbGet('session:currentQuestion')) || session
    const newSession = { index: s.index, revealed: true }
    await dbSet('session:currentQuestion', newSession)
    setSession(newSession)
  }, [session])

  const handleNext = useCallback(async () => {
    const s = (await dbGet('session:currentQuestion')) || session
    const nextIdx = s.index + 1
    const newSession = { index: nextIdx, revealed: false }
    await dbSet('session:currentQuestion', newSession)
    setSession(newSession)
    lastQIndexRef.current = nextIdx
    const v = (await dbGet('votes:q' + nextIdx)) || {}
    setVotes(v)
  }, [session])

  const handleReset = useCallback(async () => {
    for (let i = 0; i < TOTAL; i++) {
      await dbDelete('votes:q' + i)
    }
    await dbSet('session:currentQuestion', { index: 0, revealed: false })
    setSession({ index: 0, revealed: false })
    setVotes({})
    setMyVote(null)
    lastQIndexRef.current = 0
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
    return (
      <>
        <TeacherView
          session={session}
          votes={votes}
          connected={connected}
          onReveal={handleReveal}
          onNext={handleNext}
          onReset={handleReset}
        />
        <div className={`conn-toast ${!connected ? 'show' : ''}`}>
          ⚠ Reconnecting to server…
        </div>
      </>
    )
  }

  // Student
  if (!hasSession) {
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
        onVote={handleVote}
      />
      <div className={`conn-toast ${!connected ? 'show' : ''}`}>
        ⚠ Reconnecting to server…
      </div>
    </>
  )
}
