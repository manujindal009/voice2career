# 🎙️ Voice2Career

**Voice2Career** is a premium, AI-powered career preparation platform designed to help candidates ace their interviews and master their subjects through interactive mock tests and comprehensive study materials.

---

## ✨ Key Features

### 🎤 AI-Powered Mock Interviews
- Practice interviews with real-time feedback.
- Detailed performance analysis including strengths and areas for improvement.
- Secure history tracking of all your mock sessions.

### 📝 Comprehensive Mock Tests
- Test your knowledge with timed mock exams across various difficulty levels.
- Instant scoring and detailed marksheets.
- Progress tracking to monitor your growth.

### 📚 Study Materials & Resources
- Organized study folders and topics.
- Built-in PDF reader for seamless learning.
- Curated content to help you stay ahead in your career journey.

### 🤖 AI Assistant (Chatbot)
- Integrated AI assistant to answer your career-related queries and provide guidance on the fly.

### 🔐 Multi-Role User Management
- **Candidate Dashboard**: Personalized space for tracking tests, interviews, and progress.
- **Admin Panel**: Robust dashboard for managing user requests, analytics, and platform oversight.

---

## 🚀 Tech Stack

- **Frontend**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Backend**: [Firebase](https://firebase.google.com/) (Authentication, Firestore, Storage, Cloud Functions)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)
- **Charts**: [Recharts](https://recharts.org/)
- **Package Manager**: [Bun](https://bun.sh/)

---

## 🛠️ Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (Recommended) or Node.js
- Firebase Project setup

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/voice2career.git
   cd voice2career
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Configure Environment Variables:**
   Copy the example environment file and fill in your Firebase credentials.
   ```bash
   cp .env.example .env
   ```
   *Edit the `.env` file with your specific Firebase configuration keys.*

4. **Run the development server:**
   ```bash
   bun run dev
   ```

5. **Build for production:**
   ```bash
   bun run build
   ```

---

## 📂 Project Structure

```text
├── src/
│   ├── components/      # Reusable UI components
│   ├── context/         # React Context (Auth, etc.)
│   ├── lib/             # Utilities and Firebase config
│   ├── pages/           # Routed page components
│   └── main.tsx         # Application entry point
├── functions/           # Firebase Cloud Functions (Background triggers)
├── public/              # Static assets
└── .env.example         # Environment variable template
```

---

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve Voice2Career, feel free to fork the repository and submit a pull request.

---

*Developed with ❤️ by the Voice2Career Team.*
