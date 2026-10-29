// Single source of truth for the site's content.
// Sourced from the résumé and LinkedIn profile — update here when either changes.

export const profile = {
  name: 'Tanay Shah',
  initials: 'TS',
  headline: 'Software Developer in Test',
  focus: ['Java', 'Test Automation', 'CI/CD'],
  company: 'Ericsson',
  location: 'Ottawa, Ontario, Canada',
  tagline:
    'I build reliable test automation for 5G telecommunications hardware at Ericsson, from test plans to results dashboards.',
  about: [
    "I'm a detail-oriented automation tester and developer with over 2 years of hands-on experience in software test planning, writing test cases, and execution at Ericsson Canada in Ottawa.",
    "I develop and document test cases and scripts using Java and Ericsson's proprietary testing framework, execute functional and performance tests on telecommunications hardware, and collaborate with cross-functional teams throughout the full QA lifecycle.",
    'I graduated with Distinction from Carleton University in 2025 with a B.Sc. in Computer Science (Honours, AI & ML stream, Co-op).',
  ],
  facts: [
    { label: 'Based in', value: 'Ottawa, ON' },
    { label: 'Currently', value: 'Integration & Verification Tester, Ericsson' },
    { label: 'At Ericsson since', value: '2022 (co-op, internships, full-time)' },
    { label: 'Education', value: 'B.Sc. CS Honours, Carleton — Distinction' },
  ],
  // The Download Résumé button appears automatically when public/<resumeFile> exists.
  resumeFile: 'Tanay_Shah_Resume.pdf',
  // Lines ticked off by the hero terminal.
  terminalChecks: ['java', 'test_automation', 'ci_cd', '5g_hardware'],
  // Strip under the hero. "3+ years": Sep 2022–Aug 2023 plus May 2024–present.
  highlights: [
    { value: '3+ years', label: 'at Ericsson in Ottawa, from co-op to full-time' },
    { value: '5G radio', label: 'test automation on real telecom hardware' },
    { value: 'Distinction', label: 'B.Sc. Computer Science Honours, Carleton' },
  ],
};

export const links = {
  email: 'tanayshah20.09@gmail.com',
  linkedin: 'https://www.linkedin.com/in/tanay-shah-2001/',
  github: 'https://github.com/tanayshah20',
};

export const experience = [
  {
    company: 'Ericsson',
    location: 'Ottawa, Ontario, Canada',
    period: '2022 — Present',
    roles: [
      {
        title: 'Integration & Verification Tester',
        period: 'Jun 2025 — Present',
        current: true,
        bullets: [
          "Write and document modular, reusable test cases in Java with Ericsson's proprietary testing framework, covering hardware combinations with specific software parameters.",
          "Port existing test cases to the team's current Ericsson IT system architecture, keeping them modular and easy to modify.",
          'Prepare and install the correct software versions on hardware for each test run.',
        ],
        tags: ['Java', 'Maven', 'TestNG', 'Git', 'Gerrit', 'Jenkins'],
      },
      {
        title: '5G Radio Software Developer Intern',
        type: 'Part-time',
        period: 'Sep 2024 — Apr 2025',
        bullets: [
          'Built an internal test results dashboard with React and a back-end database, improving test outcome visibility across the team.',
          'Executed and analyzed poll-time performance tests on real Ericsson telecommunications hardware, tracking defects through to resolution.',
          'Proposed solutions to compatibility defects across hardware architectures, reducing future test execution time and standardizing result output.',
        ],
        tags: ['Java', 'React', 'SonarQube', 'Gerrit', 'JIRA'],
      },
      {
        title: '5G Radio Software Developer Intern',
        period: 'May 2024 — Sep 2024',
        bullets: [
          'Executed poll-time performance tests on production-grade Ericsson hardware, analyzing results and reporting performance defects systematically via JIRA.',
          "Created organized, modular Java test cases for telecommunications systems using Ericsson's testing framework.",
          'Collaborated with cross-functional engineering teams through Gerrit code review and SonarQube quality checks.',
        ],
        tags: ['Java', 'JIRA', 'Gerrit', 'SonarQube'],
      },
      {
        title: 'RPCA IVC Nodal I&T Co-op',
        period: 'Sep 2022 — Aug 2023',
        bullets: [
          "Structured test plans and executed traffic load tests on live telecommunications hardware using Ericsson's Java testing framework.",
          'Analyzed, documented, and reported test results, tracking defects and proposing solutions through to resolution.',
          'Ported legacy test cases to updated system architecture, reducing execution time and standardizing the result format.',
        ],
        tags: ['Java', 'JIRA', 'Gerrit', 'IntelliJ', 'Eclipse'],
      },
    ],
  },
];

// Early roles, shown compactly at the end of the timeline.
export const earlyExperience = [
  {
    title: 'Intern',
    company: 'Venus Software Operations',
    period: '2019',
    summary:
      'Installed operating systems and requested software on client PCs and supported senior staff with installations and data backups.',
  },
  {
    title: 'Intern',
    company: 'R.P. Computec',
    period: '2018',
    summary:
      'Installed professional software across platforms and assembled and repaired home PC systems.',
  },
];

export const skills = [
  {
    group: 'Languages',
    items: ['Java', 'Python', 'C', 'C++', 'JavaScript', 'HTML', 'CSS', 'C# (introductory)'],
  },
  {
    group: 'Testing & QA',
    items: [
      'Ericsson Java Test Framework',
      'JUnit',
      'TestNG',
      'SonarQube',
      'JIRA',
      'Gerrit',
      'Test planning',
      'Defect tracking',
    ],
  },
  {
    group: 'Web & Data',
    items: ['React', 'Node.js', 'Express', 'REST', 'MongoDB', 'Mongoose', 'Pug', 'Heroku'],
  },
  {
    group: 'Tools & Systems',
    items: ['Git', 'GitHub', 'Jenkins', 'Maven', 'IntelliJ IDEA', 'Eclipse', 'Linux', 'POSIX', 'Multithreading', 'Windows'],
  },
];

// Large card shown above the project grid.
export const featured = {
  kicker: 'Featured work · Internal tool at Ericsson',
  title: 'Test results dashboard',
  description:
    'Built during my part-time internship on the 5G radio team: a React front end backed by a database that brings test outcomes together, so the whole team can see results in one place.',
  tags: ['React', 'Back-end database', 'JavaScript'],
  note: "Internal Ericsson tool, so there's no public link or code.",
};

// Add `repo` and/or `url` to a project to show Code / Live links on its card.
export const projects = [
  {
    title: 'Automated Sudoku Solver',
    description:
      'Solves and checks Sudoku puzzles without any external libraries. Validates rows and columns and solves partial puzzles with move and error tracking.',
    tags: ['Java', 'Python'],
  },
  {
    title: 'Multi-threaded War Simulation',
    description:
      'A multi-threaded C program on Linux that simulates a fantasy war with randomized attributes, running over 100 loops to exercise concurrent systems programming.',
    tags: ['C', 'Linux', 'Multithreading'],
  },
  {
    title: 'Restaurant Order Web App',
    description:
      'Dynamic web pages for three restaurants with ordering and persistent data storage in a back-end database.',
    tags: ['JavaScript', 'Express', 'MongoDB', 'HTML/CSS'],
  },
  {
    title: 'Robot Pathfinder',
    description:
      'Computes the optimal path for a digitized robot through a grid with obstacles.',
    tags: ['Python', 'Machine Learning'],
  },
  {
    title: 'Handwriting OCR Tool',
    description:
      "Recognizes handwritten text from images, trained on a custom handwriting dataset and tested on other people's handwriting.",
    tags: ['Python', 'Machine Learning'],
  },
];

export const education = [
  {
    school: 'Carleton University',
    degree: 'B.Sc. Computer Science Honours — AI & ML Stream',
    detail: 'Co-op · Graduated with Distinction',
    period: 'Sep 2020 — May 2025',
    location: 'Ottawa, ON',
  },
  {
    school: 'The Galaxy School',
    degree: 'High School Diploma, Cambridge A Levels',
    period: '2018 — 2020',
    location: 'Rajkot, Gujarat, India',
  },
];
