import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ArrowDownRight, ArrowUpRight, TrendingUp, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TransactionForm } from "@/components/TransactionForm";
import { SpendingChart } from "@/components/SpendingChart";
import { BudgetOverview } from "@/components/BudgetOverview";
import { TransactionList } from "@/components/TransactionList";
import {
  type Transaction,
  type Budget,
  type Category,
  loadTransactions,
  saveTransactions,
  loadBudgets,
  saveBudgets,
  getMonthlyTotals,
} from "@/lib/finance";

const Index = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    setTransactions(loadTransactions());
    setBudgets(loadBudgets());
  }, []);

  const now = new Date();
  const { income, expenses, byCategory, filtered } = getMonthlyTotals(
    transactions,
    now.getMonth(),
    now.getFullYear()
  );
  const balance = income - expenses;

  const handleAdd = (t: Transaction) => {
    const updated = [...transactions, t];
    setTransactions(updated);
    saveTransactions(updated);
  };

  const handleDelete = (id: string) => {
    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated);
    saveTransactions(updated);
  };

  const handleUpdateBudget = (category: Category, limit: number) => {
    const updated = budgets.map((b) => (b.category === category ? { ...b, limit } : b));
    setBudgets(updated);
    saveBudgets(updated);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Finance</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {format(now, "MMMM yyyy")}
            </p>
          </div>
          <TransactionForm onAdd={handleAdd} />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="animate-fade-in" style={{ animationDelay: "0ms" }}>
            <CardContent className="pt-5 pb-4">
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                <Wallet className="h-4 w-4" />
                Balance
              </div>
              <p className={`text-2xl font-mono font-semibold ${balance >= 0 ? "text-success" : "text-destructive"}`}>
                ${balance.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "80ms" }}>
            <CardContent className="pt-5 pb-4">
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                <ArrowUpRight className="h-4 w-4 text-success" />
                Income
              </div>
              <p className="text-2xl font-mono font-semibold">
                ${income.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "160ms" }}>
            <CardContent className="pt-5 pb-4">
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                <ArrowDownRight className="h-4 w-4 text-destructive" />
                Expenses
              </div>
              <p className="text-2xl font-mono font-semibold">
                ${expenses.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Chart + Budget */}
          <div className="space-y-6 lg:col-span-1">
            <Card className="animate-fade-in" style={{ animationDelay: "240ms" }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Spending Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SpendingChart byCategory={byCategory} totalExpenses={expenses} />
              </CardContent>
            </Card>

            <Card className="animate-fade-in" style={{ animationDelay: "320ms" }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Budget</CardTitle>
              </CardHeader>
              <CardContent>
                <BudgetOverview
                  budgets={budgets}
                  byCategory={byCategory}
                  onUpdateBudget={handleUpdateBudget}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right: Transactions */}
          <Card className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "400ms" }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionList transactions={filtered} onDelete={handleDelete} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
