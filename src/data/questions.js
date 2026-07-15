// ═══════════════════════════════════════════════════════════
// TOPIC DEFINITIONS
// ═══════════════════════════════════════════════════════════
export const TOPICS = [
  { key: 'computer-or-not',  title: 'Computer or Not?',       icon: '🤔', description: 'Can you tell what\'s a computer?',    color: '#818cf8' },
  { key: 'characteristics',  title: 'Characteristics',         icon: '⚡', description: 'Speed, accuracy, diligence & more', color: '#f59e0b' },
  { key: 'generations',      title: 'Generations',             icon: '🕰️', description: 'Vacuum tubes to microchips',        color: '#06b6d4' },
  { key: 'applications',     title: 'Applications',            icon: '🌍', description: 'Computers in the real world',       color: '#10b981' },
  { key: 'types',            title: 'Types of Computers',      icon: '💻', description: 'Supercomputers to embedded chips',   color: '#3b82f6' },
  { key: 'functional-units', title: 'Functional Units',        icon: '🧩', description: 'CPU, memory, input & output',       color: '#f97316' },
  { key: 'input-devices',    title: 'Input Devices',           icon: '⌨️', description: 'How we talk to computers',          color: '#22c55e' },
  { key: 'output-devices',   title: 'Output Devices',          icon: '🖥️', description: 'How computers talk back',           color: '#ec4899' },
  { key: 'memory-storage',   title: 'Memory & Storage',        icon: '💾', description: 'RAM, ROM, HDD, SSD & more',        color: '#14b8a6' },
]

// ═══════════════════════════════════════════════════════════
// QUESTION DATA
//
// Fields:
//   topic                    — key from TOPICS array above
//   text                     — question text or item name
//   description              — optional subtitle shown below the item name
//   options                  — answer choices
//   correct                  — index of correct option
//   explanation              — shown after reveal
//   debatable                — true if this item sparks discussion
//   whyDebatable             — instructor note (not shown to students)
// ═══════════════════════════════════════════════════════════

const QUESTIONS = [

  // ─── TOPIC: Computer or Not? ─────────────────────────────
  {
    topic: 'computer-or-not',
    text: 'Laptop PC',
    description: 'A portable computer with a keyboard',
    options: ['Computer', 'Not a Computer'],
    correct: 0,
    explanation: 'A laptop is a classic computer. It has a processor, memory, and a screen to run programs.',
    debatable: false
  },
  {
    topic: 'computer-or-not',
    text: 'Bicycle',
    description: 'A two-wheeled vehicle you pedal',
    options: ['Computer', 'Not a Computer'],
    correct: 1,
    explanation: 'A bicycle is purely mechanical. It has no processor, no memory, and no electricity!',
    debatable: false
  },
  {
    topic: 'computer-or-not',
    text: 'Microwave Oven',
    description: 'Heats your food with a keypad and timer',
    options: ['Computer', 'Not a Computer'],
    correct: 0,
    explanation: 'It has a tiny embedded microprocessor that reads your button presses and controls timer and power level — a computer hidden inside a kitchen appliance.',
    debatable: true,
    whyDebatable: 'Students often think of "computer" as only screens/keyboards, so an appliance with a hidden chip surprises them.'
  },
  {
    topic: 'computer-or-not',
    text: 'Paper Book',
    description: 'Pages bound together with text on them',
    options: ['Computer', 'Not a Computer'],
    correct: 1,
    explanation: 'A book holds information, but it cannot process it. You have to use your own brain to read it!',
    debatable: false
  },
  {
    topic: 'computer-or-not',
    text: 'ATM Machine',
    description: 'Where you withdraw cash with a card and PIN',
    options: ['Computer', 'Not a Computer'],
    correct: 0,
    explanation: 'An ATM is a specialized computer — it authenticates your card, talks to the bank\'s server, and dispenses cash based on processed instructions.',
    debatable: false
  },
  {
    topic: 'computer-or-not',
    text: 'Smartphone',
    description: 'The phone in your pocket',
    options: ['Computer', 'Not a Computer'],
    correct: 0,
    explanation: 'A smartphone is a very powerful small computer. It runs an operating system and processes data just like a laptop.',
    debatable: false
  },
  {
    topic: 'computer-or-not',
    text: 'AC Remote Control',
    description: 'The remote you use to change temperature',
    options: ['Computer', 'Not a Computer'],
    correct: 1,
    explanation: 'The remote just sends an infrared signal — it has no real processing of its own. The actual computer is inside the AC unit, not the remote.',
    debatable: true,
    whyDebatable: 'Students will want to say Computer because it has buttons and a small display. The point: input device ≠ the computer doing the processing.'
  },
  {
    topic: 'computer-or-not',
    text: 'Traffic Signal',
    description: 'The red-yellow-green light at a junction',
    options: ['Computer', 'Not a Computer'],
    correct: 0,
    explanation: 'Most modern traffic signals run on embedded timers/microcontrollers to control light sequences — a computer working quietly in public infrastructure.',
    debatable: true,
    whyDebatable: 'Pairs nicely right after the AC Remote question — same "does it have a chip inside" logic, but opposite answer. Forces re-application of the rule instead of pattern-matching.'
  },
  {
    topic: 'computer-or-not',
    text: 'Coffee Mug',
    description: 'A cup used for drinking hot liquids',
    options: ['Computer', 'Not a Computer'],
    correct: 1,
    explanation: 'A mug holds coffee, not data! It is made of ceramic and has no computing power.',
    debatable: false
  },
  {
    topic: 'computer-or-not',
    text: 'Digital Wristwatch',
    description: 'A watch that shows time with numbers',
    options: ['Computer', 'Not a Computer'],
    correct: 0,
    explanation: 'A digital watch has a tiny microprocessor that keeps time and runs the display — it IS a computer.',
    debatable: false
  },
  {
    topic: 'computer-or-not',
    text: 'Analog Wall Clock',
    description: 'The tick-tock clock with hands and gears',
    options: ['Computer', 'Not a Computer'],
    correct: 1,
    explanation: 'A purely mechanical clock uses springs and gears — no processor, no stored program.',
    debatable: true,
    whyDebatable: 'Deliberately placed right after Digital Wristwatch. Same category (a clock), opposite answer — highlights that "what it\'s used for" doesn\'t matter, "how it works inside" does.'
  },
  {
    topic: 'computer-or-not',
    text: 'Smart TV',
    description: 'The TV that runs YouTube and Netflix apps',
    options: ['Computer', 'Not a Computer'],
    correct: 0,
    explanation: 'A Smart TV runs a full operating system and apps — it\'s essentially a computer with a very large screen attached.',
    debatable: false
  },
  {
    topic: 'computer-or-not',
    text: 'Auto-Rickshaw Meter',
    description: 'The digital fare meter in an auto',
    options: ['Computer', 'Not a Computer'],
    correct: 0,
    explanation: 'Digital fare meters use an embedded microcontroller to calculate fare based on distance and time — a small dedicated computer.',
    debatable: false
  },
  {
    topic: 'computer-or-not',
    text: 'Washing Machine (Auto)',
    description: 'The one with wash/spin cycle settings',
    options: ['Computer', 'Not a Computer'],
    correct: 0,
    explanation: 'Modern auto washing machines use an embedded computer to control cycles, water level, and spin timing.',
    debatable: true,
    whyDebatable: 'A fully manual, knob-only washing machine from decades ago would NOT count — worth mentioning so students learn it\'s about the mechanism, not the object category.'
  },

  // ─── TOPIC: Characteristics of Computers ─────────────────
  {
    topic: 'characteristics',
    text: 'A computer solving 10,000 calculations without a single mistake demonstrates which characteristic?',
    options: ['Speed', 'Accuracy', 'Diligence', 'Versatility'],
    correct: 1,
    explanation: 'Accuracy — computers produce precise, error-free results as long as the input and instructions are correct.',
    debatable: false
  },
  {
    topic: 'characteristics',
    text: 'The same computer can run a game, do accounting, and edit a video — this shows:',
    options: ['Storage', 'Versatility', 'Diligence', 'No IQ'],
    correct: 1,
    explanation: 'Versatility — a computer can perform many different types of tasks, unlike single-purpose machines.',
    debatable: false
  },
  {
    topic: 'characteristics',
    text: 'A computer doing repetitive tasks for hours without getting tired or bored shows:',
    options: ['Speed', 'Accuracy', 'Diligence', 'Storage'],
    correct: 2,
    explanation: 'Diligence — computers don\'t get tired, bored, or lose concentration, even after hours of repetitive work.',
    debatable: false
  },
  {
    topic: 'characteristics',
    text: 'A computer executing a flawed instruction exactly as written, producing a wrong result, shows it lacks:',
    options: ['Speed', 'Storage', 'Versatility', 'Judgment (No IQ)'],
    correct: 3,
    explanation: 'No IQ — a computer can\'t think for itself. It follows instructions blindly, even if they\'re wrong. Garbage in = garbage out!',
    debatable: false
  },

  // ─── TOPIC: Generations of Computers ─────────────────────
  {
    topic: 'generations',
    text: 'Which generation of computers used vacuum tubes?',
    options: ['First', 'Second', 'Third', 'Fourth'],
    correct: 0,
    explanation: 'First Generation (1940s–1950s) — used vacuum tubes, filled entire rooms, and generated a lot of heat. Example: ENIAC.',
    debatable: false
  },
  {
    topic: 'generations',
    text: 'Which generation introduced transistors?',
    options: ['First', 'Second', 'Third', 'Fourth'],
    correct: 1,
    explanation: 'Second Generation (1950s–1960s) — transistors replaced vacuum tubes, making computers smaller, faster, and more reliable.',
    debatable: false
  },
  {
    topic: 'generations',
    text: 'Which generation put thousands of transistors on a single chip (Integrated Circuits)?',
    options: ['First', 'Second', 'Third', 'Fourth'],
    correct: 2,
    explanation: 'Third Generation (1960s–1970s) — ICs packed many transistors onto one chip, making computers even smaller and cheaper.',
    debatable: false
  },
  {
    topic: 'generations',
    text: 'Which generation introduced the microprocessor — the whole CPU on one chip?',
    options: ['First', 'Second', 'Third', 'Fourth'],
    correct: 3,
    explanation: 'Fourth Generation (1970s–present) — the microprocessor put the entire CPU on a single chip. This led to personal computers!',
    debatable: false
  },

  // ─── TOPIC: Applications of Computers ────────────────────
  {
    topic: 'applications',
    text: 'A pilot practices emergency landings in a flight simulator — no real plane needed! This is computers in:',
    options: ['Entertainment', 'Education & Training', 'Banking', 'Defence'],
    correct: 1,
    explanation: 'Education & Training — Flight simulators let pilots practice dangerous scenarios safely. Computers simulate realistic cockpit conditions without any risk.',
    debatable: false
  },
  {
    topic: 'applications',
    text: 'You scan a QR code with PhonePe, and ₹500 moves instantly from your bank to the shopkeeper. Computers are working in:',
    options: ['Medicine', 'Defence', 'Banking & Finance', 'Weather Forecasting'],
    correct: 2,
    explanation: 'Banking & Finance — UPI, ATMs, online banking, and stock trading all rely on computers to process millions of transactions securely every second.',
    debatable: false
  },
  {
    topic: 'applications',
    text: 'A doctor examines a patient\'s MRI scan on screen and spots a tiny tumor invisible to the naked eye. This is:',
    options: ['Entertainment', 'Education', 'Communication', 'Medicine & Healthcare'],
    correct: 3,
    explanation: 'Medicine & Healthcare — Computers help doctors with CT/MRI scans, robotic surgery, patient records, and even AI-assisted diagnosis.',
    debatable: false
  },
  {
    topic: 'applications',
    text: 'The VFX in Bahubali — thousands of CGI soldiers, a digital waterfall — were all created on computers. This is:',
    options: ['Entertainment & Media', 'Banking', 'Defence', 'Science'],
    correct: 0,
    explanation: 'Entertainment & Media — Movies, video games, music production, and animation all use powerful computers to create stunning content.',
    debatable: false
  },
  {
    topic: 'applications',
    text: 'ISRO\'s scientists used computers to calculate Chandrayaan-3\'s precise trajectory to land on the Moon. This is:',
    options: ['Banking', 'Entertainment', 'Education', 'Science & Research'],
    correct: 3,
    explanation: 'Science & Research — Space missions, weather prediction, genome sequencing, and climate modelling all depend heavily on computer calculations.',
    debatable: false
  },

  // ─── TOPIC: Types of Computers ───────────────────────────
  {
    topic: 'types',
    text: 'India\'s "PARAM Siddhi" performs over 5 Petaflops — 5 quadrillion calculations per second! What type is it?',
    options: ['Desktop', 'Laptop', 'Supercomputer', 'Tablet'],
    correct: 2,
    explanation: 'Supercomputer — The fastest and most powerful type, used for weather forecasting, nuclear research, and space simulations. They can fill entire rooms!',
    debatable: false
  },
  {
    topic: 'types',
    text: 'IRCTC handles crores of ticket bookings from thousands of counters and phones simultaneously. The central computer is a:',
    options: ['Laptop', 'Desktop', 'Tablet', 'Mainframe'],
    correct: 3,
    explanation: 'Mainframe — A large, powerful computer designed to handle massive transaction volumes for banks, railways, and airlines simultaneously.',
    debatable: false
  },
  {
    topic: 'types',
    text: 'You carry this computer in your bag, open it in class, and it runs on a battery for hours. It is a:',
    options: ['Supercomputer', 'Mainframe', 'Laptop / Notebook', 'Workstation'],
    correct: 2,
    explanation: 'Laptop / Notebook — A portable personal computer (microcomputer) with built-in screen, keyboard, trackpad, and battery.',
    debatable: false
  },
  {
    topic: 'types',
    text: 'The tiny computer chip inside your washing machine that controls water level and spin cycles is an:',
    options: ['Supercomputer', 'Desktop', 'Embedded Computer', 'Mainframe'],
    correct: 2,
    explanation: 'Embedded Computer — A small, special-purpose computer built into another device. Found in cars, washing machines, microwaves, and traffic signals.',
    debatable: true,
    whyDebatable: 'Some students argue it\'s too small to be a "computer", but it runs a stored program — the defining characteristic.'
  },

  // ─── TOPIC: Functional Units of Computer System ──────────
  {
    topic: 'functional-units',
    text: 'Which part of the computer is called its "brain" — it processes every instruction you give?',
    options: ['Keyboard', 'Monitor', 'CPU (Central Processing Unit)', 'Hard Disk'],
    correct: 2,
    explanation: 'CPU — The Central Processing Unit fetches, decodes, and executes every instruction in your programs. It\'s the brain of the entire system!',
    debatable: false
  },
  {
    topic: 'functional-units',
    text: 'Inside the CPU, one unit does all the math (+, −, ×, ÷) and comparisons (>, <, =). Which unit?',
    options: ['Control Unit (CU)', 'ALU (Arithmetic Logic Unit)', 'Memory Unit', 'Output Unit'],
    correct: 1,
    explanation: 'ALU — The Arithmetic Logic Unit handles all arithmetic operations (add, subtract, etc.) and logical comparisons (greater than, equal to, etc.).',
    debatable: false
  },
  {
    topic: 'functional-units',
    text: 'The Control Unit (CU) works like a traffic police officer — it doesn\'t calculate, but it:',
    options: ['Stores all the data', 'Performs arithmetic', 'Directs and coordinates all other units', 'Displays results on screen'],
    correct: 2,
    explanation: 'The Control Unit directs the flow of data between CPU, memory, and I/O devices. It tells each part WHEN and WHAT to do — like a conductor of an orchestra!',
    debatable: false
  },
  {
    topic: 'functional-units',
    text: 'Primary memory (RAM) holds data the CPU is currently working on. What happens when you switch off?',
    options: ['It moves to the monitor', 'It is saved permanently', 'It is lost (erased)', 'It goes to the printer'],
    correct: 2,
    explanation: 'RAM is volatile memory — it loses all data when power is off. That\'s why you must save your work to the hard disk before shutting down!',
    debatable: false
  },
  {
    topic: 'functional-units',
    text: 'A computer system has four main functional units: Input, Output, Processing (CPU), and ____:',
    options: ['Keyboard', 'Storage / Memory Unit', 'Printer', 'Internet'],
    correct: 1,
    explanation: 'Storage / Memory Unit — Stores data and instructions temporarily (RAM) and permanently (hard disk). Without it, the CPU would have nothing to work on!',
    debatable: false
  },

  // ─── TOPIC: Input Devices ────────────────────────────────
  {
    topic: 'input-devices',
    text: '🎤 During an online Zoom class, you speak into this device so others can hear you. This input device is a:',
    options: ['Speaker', 'Monitor', 'Microphone', 'Printer'],
    correct: 2,
    explanation: 'Microphone — Converts your voice (sound waves) into electrical signals. It\'s an input device because data flows INTO the computer.',
    debatable: false
  },
  {
    topic: 'input-devices',
    text: 'At Big Bazaar, the cashier points a red light at the barcode on your Maggi packet — beep! That device is a:',
    options: ['Printer', 'Barcode Scanner', 'Speaker', 'Monitor'],
    correct: 1,
    explanation: 'Barcode Scanner — Reads the barcode pattern and sends product information to the computer. Used in supermarkets, libraries, and warehouses.',
    debatable: false
  },
  {
    topic: 'input-devices',
    text: 'You have an old printed family photo and want to bring it into the computer as a digital image. Which device?',
    options: ['Printer', 'Projector', 'Scanner', 'Speaker'],
    correct: 2,
    explanation: 'Scanner — Shines light on a physical document/photo and converts it into a digital image file you can edit and share.',
    debatable: false
  },
  {
    topic: 'input-devices',
    text: 'In a video game, you move a stick and press buttons to control your character. This input device is a:',
    options: ['Monitor', 'Joystick / Gamepad', 'Printer', 'Speaker'],
    correct: 1,
    explanation: 'Joystick / Gamepad — A specialized input device for gaming that sends directional and button-press signals to the computer.',
    debatable: false
  },
  {
    topic: 'input-devices',
    text: '🎹 I have 104 keys but can\'t open a single lock. What am I?',
    options: ['Piano', 'Keyboard', 'Calculator', 'Typewriter'],
    correct: 1,
    explanation: 'Keyboard — The most common input device! It has keys for letters, numbers, symbols, and function keys to type data into the computer.',
    debatable: true,
    whyDebatable: 'Students might argue "Piano" — which also has keys! Great for discussing how the same word can mean different things in different contexts.'
  },

  // ─── TOPIC: Output Devices ───────────────────────────────
  {
    topic: 'output-devices',
    text: 'In a movie theater, a device throws light onto the giant screen so hundreds can watch. This output device is a:',
    options: ['Camera', 'Scanner', 'Projector', 'Microphone'],
    correct: 2,
    explanation: 'Projector — An output device that takes video signals from a computer and projects them as a large image on a screen or wall.',
    debatable: false
  },
  {
    topic: 'output-devices',
    text: 'You plug these into your phone to listen to songs without disturbing others. These output devices are:',
    options: ['Microphone', 'Earphones / Headphones', 'Scanner', 'Webcam'],
    correct: 1,
    explanation: 'Earphones / Headphones — Output devices that convert electrical signals into sound waves. They\'re personal speakers you wear!',
    debatable: false
  },
  {
    topic: 'output-devices',
    text: 'Google Maps says "Turn left in 200 meters" out loud while you drive. The output device producing this voice is a:',
    options: ['Microphone', 'Keyboard', 'GPS Antenna', 'Speaker'],
    correct: 3,
    explanation: 'Speaker — An output device that converts electrical signals into sound. Used for music, alerts, navigation, and voice assistants.',
    debatable: false
  },
  {
    topic: 'output-devices',
    text: 'Your teacher sends a document from her computer and gets a paper copy. The device putting ink on paper is a:',
    options: ['Scanner (Input)', 'Monitor (Output)', 'Mouse (Input)', 'Printer (Output)'],
    correct: 3,
    explanation: 'Printer — An output device that produces a physical (hard copy) version of digital documents on paper using ink or toner.',
    debatable: false
  },

  // ─── TOPIC: Memory & Storage Devices ─────────────────────
  {
    topic: 'memory-storage',
    text: 'This memory is like a classroom whiteboard — data is there ONLY while the computer is ON. Turn off, and poof! It is:',
    options: ['Hard Disk', 'Pen Drive', 'RAM (Random Access Memory)', 'DVD'],
    correct: 2,
    explanation: 'RAM — Random Access Memory is volatile (temporary). The CPU uses it as a fast workspace for running programs. No power = no data!',
    debatable: false
  },
  {
    topic: 'memory-storage',
    text: 'You save your college project on a small stick that plugs into a USB port. This portable storage device is a:',
    options: ['RAM', 'Hard Disk', 'USB Flash Drive (Pen Drive)', 'ROM'],
    correct: 2,
    explanation: 'USB Flash Drive (Pen Drive) — A small, portable, non-volatile storage device using flash memory chips. Keeps your data safe without power.',
    debatable: false
  },
  {
    topic: 'memory-storage',
    text: 'ROM keeps its data even after shutdown. A common example in your computer is:',
    options: ['Your game files', 'The BIOS chip on the motherboard', 'Downloaded movies', 'The Windows desktop'],
    correct: 1,
    explanation: 'The BIOS (Basic Input/Output System) is stored in ROM. It contains startup instructions that run the moment you press power — before Windows even loads!',
    debatable: false
  },
  {
    topic: 'memory-storage',
    text: 'Inside your computer, a device spins a metal disc at 5,400–7,200 RPM to read and write files. It is a:',
    options: ['RAM', 'ROM', 'Hard Disk Drive (HDD)', 'Pen Drive'],
    correct: 2,
    explanation: 'HDD — A Hard Disk Drive stores large amounts of data permanently on spinning magnetic platters. It\'s where your OS, apps, and files live.',
    debatable: false
  },
  {
    topic: 'memory-storage',
    text: 'Modern laptops replace spinning disks with faster, silent, shock-proof storage. This device with no moving parts is a:',
    options: ['HDD (Hard Disk Drive)', 'Floppy Disk', 'SSD (Solid State Drive)', 'RAM'],
    correct: 2,
    explanation: 'SSD — A Solid State Drive uses flash memory chips (no moving parts), making it much faster, quieter, and more durable than a traditional HDD.',
    debatable: false
  }
]

export default QUESTIONS