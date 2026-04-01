# HR Nexus — AI-Powered HR Management SaaS

HR Nexus is a high-fidelity prototype of a modern, AI-integrated Human Resources Management system. Built for speed, scalability, and premium user experience, it demonstrates core HR workflows enhanced by simulated Gemini AI intelligence.

## 🚀 Features

### 1. Unified HR Dashboard
- **Real-time KPIs:** Track active employees, open positions, and pending tickets at a glance.
- **Data Visualization:** Interactive charts for department distribution and task status using Recharts.
- **AI-Driven Insights:** Simulated Gemini-powered alerts for attrition risk and performance trends.

### 2. Intelligent Recruitment
- **Job Management:** Create and manage job postings with status tracking.
- **AI Resume Screening:** Simulated AI analysis that matches candidate resumes against job descriptions, providing match scores and recommendations.
- **Candidate Pipeline:** Visual dashboard for tracking applicants from screening to interview.

### 3. Employee Management
- **Directory:** Searchable employee list with filtering by department and status.
- **Rich Profiles:** Detailed employee views including contact info, role history, and assigned tasks.
- **Onboarding:** Interactive checklists to ensure seamless transitions for new hires.

### 4. Payroll & Analytics
- **Payroll Cycles:** Summary tables for managing salaries, bonuses, and net pay.
- **Analytics:** Predictive analytics placeholders for workforce spending trends.

### 5. Task & Ticket Systems
- **Kanban Task Board:** Visual workload management with drag-and-drop feel.
- **Ticket Center:** Centralized issue tracking for resolving employee requests and internal HR tickets.

## 🛠 Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** TailwindCSS v4 (with custom glassmorphism components)
- **Icons:** Lucide React
- **Charts:** Recharts
- **Routing:** React Router 7
- **Persistence:** Reactive `localStorage` Store (for prototype speed)

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Vardhan-3/DeltaOS.git
   cd DeltaOS
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## 🧠 AI Simulation
The "AI" features in this prototype (Resume Screening, Dashboard Insights) are currently simulated using logic that mimics the behavior of the **Google Gemini API**. This architecture is designed to be easily swapped with actual Google Cloud AI endpoints for production deployment.

---
Built with ❤️ by Antigravity for Vardhan-3.
