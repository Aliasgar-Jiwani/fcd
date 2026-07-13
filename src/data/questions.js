// ═══════════════════════════════════════════════════════════
// QUESTION DATA — 3 Rounds, 23 Questions Total
//
// Fields:
//   round, roundTitle, text  — always present
//   options                  — answer choices
//   correct                  — index of correct option (null = no right answer)
//   description              — optional subtitle shown below the item name
//   explanation              — shown after reveal
//   debatable                — true if this item is meant to spark disagreement
//   whyDebatable              — instructor note: why students might argue (not necessarily shown on screen)
// ═══════════════════════════════════════════════════════════

const QUESTIONS = [
  // ─── Round 1: Computer or Not? (shuffled — no more than 2 same-answer in a row) ───
  {
    round: 1, roundTitle: 'Computer or Not?',
    text: 'Laptop PC',
    description: 'A portable computer with a keyboard',
    options: ['Computer', 'Not a Computer'],
    correct: 0,
    explanation: 'A laptop is a classic computer. It has a processor, memory, and a screen to run programs.',
    debatable: false
  },
  {
    round: 1, roundTitle: 'Computer or Not?',
    text: 'Bicycle',
    description: 'A two-wheeled vehicle you pedal',
    options: ['Computer', 'Not a Computer'],
    correct: 1,
    explanation: 'A bicycle is purely mechanical. It has no processor, no memory, and no electricity!',
    debatable: false
  },
  {
    round: 1, roundTitle: 'Computer or Not?',
    text: 'Microwave Oven',
    description: 'Heats your food with a keypad and timer',
    options: ['Computer', 'Not a Computer'],
    correct: 0,
    explanation: 'It has a tiny embedded microprocessor that reads your button presses and controls timer and power level — a computer hidden inside a kitchen appliance.',
    debatable: true,
    whyDebatable: 'Students often think of "computer" as only screens/keyboards, so an appliance with a hidden chip surprises them.'
  },
  {
    round: 1, roundTitle: 'Computer or Not?',
    text: 'Paper Book',
    description: 'Pages bound together with text on them',
    options: ['Computer', 'Not a Computer'],
    correct: 1,
    explanation: 'A book holds information, but it cannot process it. You have to use your own brain to read it!',
    debatable: false
  },
  {
    round: 1, roundTitle: 'Computer or Not?',
    text: 'ATM Machine',
    description: 'Where you withdraw cash with a card and PIN',
    options: ['Computer', 'Not a Computer'],
    correct: 0,
    explanation: 'An ATM is a specialized computer — it authenticates your card, talks to the bank\'s server, and dispenses cash based on processed instructions.',
    debatable: false
  },

  {
    round: 1, roundTitle: 'Computer or Not?',
    text: 'Smartphone',
    description: 'The phone in your pocket',
    options: ['Computer', 'Not a Computer'],
    correct: 0,
    explanation: 'A smartphone is a very powerful small computer. It runs an operating system and processes data just like a laptop.',
    debatable: false
  },
  {
    round: 1, roundTitle: 'Computer or Not?',
    text: 'AC Remote Control',
    description: 'The remote you use to change temperature',
    options: ['Computer', 'Not a Computer'],
    correct: 1,
    explanation: 'The remote just sends an infrared signal — it has no real processing of its own. The actual computer is inside the AC unit, not the remote.',
    debatable: true,
    whyDebatable: 'Students will want to say Computer because it has buttons and a small display. The point: input device ≠ the computer doing the processing.'
  },
  {
    round: 1, roundTitle: 'Computer or Not?',
    text: 'Traffic Signal',
    description: 'The red-yellow-green light at a junction',
    options: ['Computer', 'Not a Computer'],
    correct: 0,
    explanation: 'Most modern traffic signals run on embedded timers/microcontrollers to control light sequences — a computer working quietly in public infrastructure.',
    debatable: true,
    whyDebatable: 'Pairs nicely right after the AC Remote question — same "does it have a chip inside" logic, but opposite answer. Forces re-application of the rule instead of pattern-matching.'
  },
  {
    round: 1, roundTitle: 'Computer or Not?',
    text: 'Coffee Mug',
    description: 'A cup used for drinking hot liquids',
    options: ['Computer', 'Not a Computer'],
    correct: 1,
    explanation: 'A mug holds coffee, not data! It is made of ceramic and has no computing power.',
    debatable: false
  },
  {
    round: 1, roundTitle: 'Computer or Not?',
    text: 'Digital Wristwatch',
    description: 'A watch that shows time with numbers',
    options: ['Computer', 'Not a Computer'],
    correct: 0,
    explanation: 'A digital watch has a tiny microprocessor that keeps time and runs the display — it IS a computer.',
    debatable: false
  },
  {
    round: 1, roundTitle: 'Computer or Not?',
    text: 'Analog Wall Clock',
    description: 'The tick-tock clock with hands and gears',
    options: ['Computer', 'Not a Computer'],
    correct: 1,
    explanation: 'A purely mechanical clock uses springs and gears — no processor, no stored program.',
    debatable: true,
    whyDebatable: 'Deliberately placed right after Digital Wristwatch. Same category (a clock), opposite answer — highlights that "what it\'s used for" doesn\'t matter, "how it works inside" does.'
  },
  {
    round: 1, roundTitle: 'Computer or Not?',
    text: 'Smart TV',
    description: 'The TV that runs YouTube and Netflix apps',
    options: ['Computer', 'Not a Computer'],
    correct: 0,
    explanation: 'A Smart TV runs a full operating system and apps — it\'s essentially a computer with a very large screen attached.',
    debatable: false
  },
  {
    round: 1, roundTitle: 'Computer or Not?',
    text: 'Auto-Rickshaw Meter',
    description: 'The digital fare meter in an auto',
    options: ['Computer', 'Not a Computer'],
    correct: 0,
    explanation: 'Digital fare meters use an embedded microcontroller to calculate fare based on distance and time — a small dedicated computer.',
    debatable: false
  },
  {
    round: 1, roundTitle: 'Computer or Not?',
    text: 'Washing Machine (Auto)',
    description: 'The one with wash/spin cycle settings',
    options: ['Computer', 'Not a Computer'],
    correct: 0,
    explanation: 'Modern auto washing machines use an embedded computer to control cycles, water level, and spin timing.',
    debatable: true,
    whyDebatable: 'A fully manual, knob-only washing machine from decades ago would NOT count — worth mentioning so students learn it\'s about the mechanism, not the object category.'
  },

  // ─── Round 2: Characteristics of Computers ───
  {
    round: 2, roundTitle: 'Characteristics of Computers',
    text: 'A computer solving 10,000 calculations without a single mistake demonstrates which characteristic?',
    options: ['Speed', 'Accuracy', 'Diligence', 'Versatility'],
    correct: 1,
    explanation: 'Accuracy — computers produce precise, error-free results as long as the input and instructions are correct.',
    debatable: false
  },
  {
    round: 2, roundTitle: 'Characteristics of Computers',
    text: 'The same computer can run a game, do accounting, and edit a video — this shows:',
    options: ['Storage', 'Versatility', 'Diligence', 'No IQ'],
    correct: 1,
    explanation: 'Versatility — a computer can perform many different types of tasks, unlike single-purpose machines.',
    debatable: false
  },
  {
    round: 2, roundTitle: 'Characteristics of Computers',
    text: 'A computer doing repetitive tasks for hours without getting tired or bored shows:',
    options: ['Speed', 'Accuracy', 'Diligence', 'Storage'],
    correct: 2,
    explanation: 'Diligence — computers don\'t get tired, bored, or lose concentration, even after hours of repetitive work.',
    debatable: false
  },
  {
    round: 2, roundTitle: 'Characteristics of Computers',
    text: 'A computer executing a flawed instruction exactly as written, producing a wrong result, shows it lacks:',
    options: ['Speed', 'Storage', 'Versatility', 'Judgment (No IQ)'],
    correct: 3,
    explanation: 'No IQ — a computer can\'t think for itself. It follows instructions blindly, even if they\'re wrong. Garbage in = garbage out!',
    debatable: false
  },

  // ─── Round 3: Generations of Computers ───
  {
    round: 3, roundTitle: 'Generations of Computers',
    text: 'Which generation of computers used vacuum tubes?',
    options: ['First', 'Second', 'Third', 'Fourth'],
    correct: 0,
    explanation: 'First Generation (1940s–1950s) — used vacuum tubes, filled entire rooms, and generated a lot of heat. Example: ENIAC.',
    debatable: false
  },
  {
    round: 3, roundTitle: 'Generations of Computers',
    text: 'Which generation introduced transistors?',
    options: ['First', 'Second', 'Third', 'Fourth'],
    correct: 1,
    explanation: 'Second Generation (1950s–1960s) — transistors replaced vacuum tubes, making computers smaller, faster, and more reliable.',
    debatable: false
  },
  {
    round: 3, roundTitle: 'Generations of Computers',
    text: 'Which generation put thousands of transistors on a single chip (Integrated Circuits)?',
    options: ['First', 'Second', 'Third', 'Fourth'],
    correct: 2,
    explanation: 'Third Generation (1960s–1970s) — ICs packed many transistors onto one chip, making computers even smaller and cheaper.',
    debatable: false
  },
  {
    round: 3, roundTitle: 'Generations of Computers',
    text: 'Which generation introduced the microprocessor — the whole CPU on one chip?',
    options: ['First', 'Second', 'Third', 'Fourth'],
    correct: 3,
    explanation: 'Fourth Generation (1970s–present) — the microprocessor put the entire CPU on a single chip. This led to personal computers!',
    debatable: false
  }
]

export default QUESTIONS