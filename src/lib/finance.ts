export type Category = "Housing" | "Food & Dining" | "Transport" | "Entertainment" | "Utilities";

export const CATEGORIES: Category[] = ["Housing", "Food & Dining", "Transport", "Entertainment", "Utilities"];

export const CATEGORY_COLORS: Record<Category, string> = {
  "Housing": "hsl(38, 90%, 55%)",
  "Food & Dining": "hsl(200, 70%, 50%)",
  "Transport": "hsl(142, 60%, 45%)",
  "Entertainment": "hsl(280, 60%, 55%)",
  "Utilities": "hsl(15, 80%, 55%)",
};

export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  amount: number;
  category: Category;
  description: string;
  date: string; // ISO string
  type: TransactionType;
}

export interface Budget {
  category: Category;
  limit: number;
}

const STORAGE_KEY = "finance_transactions";
const BUDGET_KEY = "finance_budgets";

export function loadTransactions(): Transaction[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : getDefaultTransactions();
  } catch {
    return getDefaultTransactions();
  }
}

export function saveTransactions(txns: Transaction[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(txns));
}

export function loadBudgets(): Budget[] {
  try {
    const raw = localStorage.getItem(BUDGET_KEY);
    return raw ? JSON.parse(raw) : getDefaultBudgets();
  } catch {
    return getDefaultBudgets();
  }
}

export function saveBudgets(budgets: Budget[]) {
  localStorage.setItem(BUDGET_KEY, JSON.stringify(budgets));
}

function getDefaultBudgets(): Budget[] {
  return [
    { category: "Housing", limit: 1500 },
    { category: "Food & Dining", limit: 600 },
    { category: "Transport", limit: 300 },
    { category: "Entertainment", limit: 200 },
    { category: "Utilities", limit: 250 },
  ];
}

function getDefaultTransactions(): Transaction[] {
  const now = new Date();
  const m = now.getMonth();
  const y = now.getFullYear();
  return [
    { id: "1", amount: 4200, category: "Housing", description: "Salary", date: new Date(y, m, 1).toISOString(), type: "income" },
    { id: "2", amount: 1200, category: "Housing", description: "Rent", date: new Date(y, m, 1).toISOString(), type: "expense" },
    { id: "3", amount: 85, category: "Food & Dining", description: "Groceries", date: new Date(y, m, 3).toISOString(), type: "expense" },
    { id: "4", amount: 45, category: "Entertainment", description: "Cinema & drinks", date: new Date(y, m, 5).toISOString(), type: "expense" },
    { id: "5", amount: 120, category: "Utilities", description: "Electric & water", date: new Date(y, m, 7).toISOString(), type: "expense" },
    { id: "6", amount: 60, category: "Transport", description: "Gas", date: new Date(y, m, 10).toISOString(), type: "expense" },
    { id: "7", amount: 150, category: "Food & Dining", description: "Restaurants", date: new Date(y, m, 12).toISOString(), type: "expense" },
    { id: "8", amount: 35, category: "Entertainment", description: "Streaming subs", date: new Date(y, m, 15).toISOString(), type: "expense" },
  ];
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function getMonthlyTotals(transactions: Transaction[], month: number, year: number) {
  const filtered = transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getMonth() === month && d.getFullYear() === year;
  });

  const income = filtered.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expenses = filtered.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);

  const byCategory: Record<Category, number> = {} as any;
  CATEGORIES.forEach((c) => {
    byCategory[c] = filtered
      .filter((t) => t.type === "expense" && t.category === c)
      .reduce((s, t) => s + t.amount, 0);
  });

  return { income, expenses, byCategory, filtered };
}
