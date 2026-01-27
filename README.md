# CCNA Quiz Platform

A modern, dynamic React-based quiz platform for Cisco CCNA certification preparation. Features interactive quizzes with multiple question types, comprehensive study summaries, and checkpoint assessments.

## 🚀 Features

- **Multiple Question Types**
  - Single choice (radio buttons)
  - Multiple choice (checkboxes with exact count validation)
  - Matching questions (click-to-match interface)

- **Dynamic Content Loading**
  - Fully automated file discovery using Vite's `import.meta.glob`
  - Add new modules by simply dropping files in the data folder
  - No code changes required for new content

- **Study Tools**
  - Module summaries with key concepts and quick reference guides
  - Individual module quizzes
  - Checkpoint quizzes covering multiple modules

- **User Experience**
  - Real-time score tracking
  - Progress bar with percentage completion
  - Jump-to-question grid with color-coded status
  - Auto-submit on navigation
  - Try Again functionality for individual questions
  - Detailed explanations after submission

## 📂 Project Structure
```
src/
├── components/
│   ├── Quiz.jsx              # Reusable quiz component
│   └── ModuleSummary.jsx     # Summary page component
├── pages/
│   ├── CourseHome.jsx        # Course selection homepage
│   ├── CCNAModules.jsx       # CCNA modules listing
│   └── QuizHome.jsx          # (deprecated)
├── data/
│   └── ccna/
│       ├── modules.json              # Module metadata (drives entire app)
│       ├── module-8-summary.json     # Module 8 summary
│       ├── module-8-quiz.json        # Module 8 quiz questions
│       ├── module-9-summary.json
│       ├── module-9-quiz.json
│       ├── module-10-summary.json
│       ├── module-10-quiz.json
│       ├── module-11-summary.json
│       ├── module-11-quiz.json
│       ├── module-12-summary.json
│       ├── module-12-quiz.json
│       ├── module-13-summary.json
│       ├── module-13-quiz.json
│       ├── module-14-summary.json
│       ├── module-14-quiz.json
│       └── checkpoint-14-15-quiz.json
└── App.jsx                   # Main routing configuration
```

## 🎯 Current Content

### CCNA Modules
- **Module 8**: Network Layer (IPv4, IPv6, Routing, IP Headers, MTU)
- **Module 9**: Address Resolution (ARP, ARP Cache, NDP, MAC Tables)
- **Module 10**: Basic Router Configuration (CLI Modes, Passwords, Interfaces)
- **Module 11**: IPv4 Addressing (Subnetting, CIDR, VLSM, ANDing)
- **Module 12**: IPv6 Addressing (IPv6 Format, Compression, Link-Local)
- **Module 13**: ICMP (Ping, Traceroute, Error Messages)
- **Module 14**: Transport Layer (TCP, UDP, Port Numbers, Flow Control)

### Checkpoint Quizzes
- **Checkpoint 14-15**: Transport & Application Layer (61 questions)

## 🛠️ Technologies

- **React** - UI framework
- **React Router** - Navigation
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **JavaScript** - Logic

## 📥 Installation
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd ccna-quiz-platform

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🎨 Adding New Content

### Adding a New Module

1. **Create quiz file**: `src/data/ccna/module-{number}-quiz.json`
2. **Create summary file**: `src/data/ccna/module-{number}-summary.json`
3. **Update metadata**: Add module entry to `src/data/ccna/modules.json`

That's it! The app automatically discovers and loads the new module.

### Quiz JSON Format
```json
[
  {
    "id": 1,
    "text": "Question text?",
    "type": "single",
    "options": [
      { "id": "a", "text": "Option A" },
      { "id": "b", "text": "Option B" }
    ],
    "correctAnswer": ["a"],
    "explanation": "Explanation text..."
  }
]
```

**Question Types:**
- `"single"` - Single choice (radio buttons)
- `"multiple"` - Multiple choice (checkboxes)
- `"matching"` - Matching question (click-to-match)

### Matching Question Format
```json
{
  "id": 13,
  "text": "Match the items...",
  "type": "matching",
  "columnA": [
    { "id": "a1", "text": "Item 1" },
    { "id": "a2", "text": "Item 2" }
  ],
  "columnB": [
    { "id": "b1", "text": "Match 1" },
    { "id": "b2", "text": "Match 2" }
  ],
  "correctMatches": [
    { "a": "a1", "b": "b2" },
    { "a": "a2", "b": "b1" }
  ],
  "explanation": "Explanation..."
}
```

### Summary JSON Format
```json
{
  "number": 8,
  "title": "Network Layer",
  "description": "Brief description",
  "keyConcepts": [
    {
      "title": "Concept Title",
      "description": "Concept description"
    }
  ],
  "importantPoints": [
    "Important point 1",
    "Important point 2"
  ],
  "quickReference": [
    { "label": "Term", "value": "Definition" }
  ]
}
```

### Modules Metadata Format
```json
{
  "id": "module-8",
  "number": 8,
  "title": "Network Layer",
  "description": "IP addressing, routing, and network layer protocols",
  "topics": ["IPv4", "IPv6", "Routing"],
  "hasSummary": true,
  "hasQuiz": true,
  "checkpoints": [],
  "color": "from-blue-500 to-cyan-600"
}
```

### Adding a Checkpoint Quiz

1. **Create checkpoint quiz**: `src/data/ccna/checkpoint-{numbers}-quiz.json`
2. **Update modules**: Add checkpoint ID to relevant modules in `modules.json`

Example:
```json
{
  "id": "module-14",
  "checkpoints": ["checkpoint-14-15"]
}
```

## 🎯 Naming Conventions

- Module quiz: `module-{number}-quiz.json`
- Module summary: `module-{number}-summary.json`
- Checkpoint quiz: `checkpoint-{number}-{number}-quiz.json`
- Module ID in metadata: `module-{number}`
- Checkpoint ID in metadata: `checkpoint-{number}-{number}`

## 🔮 Planned Features

- IT Essentials 8 course content
- Progress tracking and statistics
- Timed quiz mode
- Shuffle questions option
- Dark mode
- Export quiz results
- More checkpoint quizzes

## 🤝 Contributing

Contributions welcome! Please follow the existing file structure and naming conventions.

## 📝 License

MIT License

## 👨‍🎓 Author

Built for CCNA and IT Essentials certification preparation.

---

**Happy studying! 🎓**
```

---

## 📝 **Create .gitignore**

**Create `.gitignore` in project root:**
```
# Dependencies
node_modules/

# Build outputs
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Editor directories and files
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store

# Testing
coverage/

# Temporary files
*.tmp
*.temp