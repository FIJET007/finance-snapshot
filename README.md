# Money Snapshot

A lightweight personal finance tracker built with React and TypeScript. Quickly visualize your spending habits, set category budgets, and track your monthly income and expenses with an intuitive dashboard.

## Features

- **Transaction Management**: Log income and expenses across five spending categories (Housing, Food & Dining, Transport, Entertainment, Utilities)
- **Budget Tracking**: Set monthly budget limits per category and monitor spending in real-time
- **Monthly Overview**: Quick view of total income, expenses, and balance for the current month
- **Spending Breakdown**: Visual charts showing expense distribution across categories
- **Local Storage**: All data persists locally in your browser—no accounts or server required
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or Bun package manager

### Installation

```sh
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally
- `npm run test` - Run all tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint checks

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Components**: Shadcn/ui (built on Radix UI)
- **Form Handling**: React Hook Form
- **Data Visualization**: Recharts
- **Styling**: Tailwind CSS
- **Testing**: Vitest & Playwright
- **Routing**: React Router

## How It Works

### Data Storage

All transactions and budget settings are stored in browser localStorage under the keys `finance_transactions` and `finance_budgets`. The app loads sample data on first use to help you get started.

### Categories

- Housing
- Food & Dining
- Transport
- Entertainment
- Utilities

Budgets can be customized for each category, and the app alerts you when spending exceeds your limit.

## Contributing

No external contributions at this time. This is a personal project.

## License

MIT

- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS


