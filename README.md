Money Snapshot

A lightweight personal finance tracker built with React and TypeScript that helps users quickly visualize spending habits, track income and expenses, and manage category budgets through a simple and intuitive dashboard.

The application focuses on simplicity, speed, and accessibility, allowing users to track their finances without creating accounts or connecting external services.

Features
Transaction Management

Log income and expenses across five spending categories:

Housing

Food & Dining

Transport

Entertainment

Utilities

Users can easily add and review transactions in one place.

Budget Tracking

Set monthly budget limits for each category and monitor spending in real time. The dashboard highlights when spending approaches or exceeds the budget.

Monthly Overview

Quick summary showing:

Total monthly income

Total monthly expenses

Remaining balance

This gives users a fast snapshot of their financial situation.

Spending Breakdown

Interactive charts display how expenses are distributed across categories, helping users understand spending patterns visually.

Local Storage Persistence

All data is stored locally in the browser using localStorage, meaning:

No account required

No backend infrastructure needed

Instant access to saved data

Responsive Design

The interface adapts to both desktop and mobile devices for a smooth experience across screen sizes.

Tech Stack

This project was built using modern frontend tools:

Frontend: React 18 + TypeScript

Build Tool: Vite

UI Components: shadcn/ui (Radix UI)

Styling: Tailwind CSS

Forms: React Hook Form

Charts: Recharts

Routing: React Router

Testing: Vitest & Playwright

Getting Started
Prerequisites

Node.js (v18 or higher)

npm or Bun

Installation
npm install
npm run dev

Development Scripts
Command	Description
npm run dev	Start development server
npm run build	Build project for production
npm run preview	Preview the production build
npm run test	Run tests once
npm run test:watch	Run tests in watch mode
npm run lint	Run ESLint checks
How the App Works
Data Storage

Transactions and budgets are stored in the browser using localStorage.

Storage keys:

finance_transactions

finance_budgets

The app loads sample data on first launch to demonstrate how the dashboard works.

Development Notes
What I Built and Why I Made Certain Choices

Money Snapshot was built to demonstrate how a simple financial dashboard can help users track their spending without requiring complex setup or backend services.

Key technical decisions included:

React + TypeScript for maintainable and scalable frontend development.

Vite for a fast development environment and optimized builds.

Tailwind CSS to speed up UI development and maintain design consistency.

shadcn/ui to provide accessible, well-designed UI components.

Recharts for visualizing financial data in an easy-to-understand format.

LocalStorage to keep the application lightweight and avoid backend dependencies.

These choices allowed the application to remain fast, simple, and easy to maintain.

What I Would Improve With More Time

If more time were available, I would improve the application by adding:

User authentication and cloud storage

Database integration for persistent cross-device data

Custom spending categories

Advanced analytics such as spending trends and financial insights

Savings goals tracking

Export/import functionality (CSV or bank statement uploads)

Expanded test coverage

Challenges Faced

One challenge was ensuring that transaction updates dynamically reflected across all dashboard components, including charts, summaries, and category budgets.

Another challenge was structuring the data flow between forms, state management, and chart visualization to ensure accuracy and responsiveness whenever transactions changed.

Time Spent

Approximately 8–12 hours were spent completing the project, including:

Project setup and architecture

Building UI components

Implementing transaction and budget logic

Integrating charts and visualizations

Testing and refinement

License

MIT
