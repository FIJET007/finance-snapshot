import { describe, it, expect } from "vitest";
import { generateId, getMonthlyTotals } from "@/lib/finance";
import type { Transaction } from "@/lib/finance";

describe("Finance Utilities", () => {
  it("should generate unique IDs", () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
    expect(typeof id1).toBe("string");
  });

  it("should calculate monthly totals correctly", () => {
    const now = new Date();
    const transactions: Transaction[] = [
      {
        id: "1",
        amount: 4000,
        category: "Housing",
        description: "Salary",
        date: new Date(now.getFullYear(), now.getMonth(), 1).toISOString(),
        type: "income",
      },
      {
        id: "2",
        amount: 1200,
        category: "Housing",
        description: "Rent",
        date: new Date(now.getFullYear(), now.getMonth(), 5).toISOString(),
        type: "expense",
      },
      {
        id: "3",
        amount: 150,
        category: "Food & Dining",
        description: "Groceries",
        date: new Date(now.getFullYear(), now.getMonth(), 10).toISOString(),
        type: "expense",
      },
    ];

    const totals = getMonthlyTotals(transactions, now.getMonth(), now.getFullYear());
    expect(totals.income).toBe(4000);
    expect(totals.expenses).toBe(1350);
    expect(totals.byCategory["Housing"]).toBe(1200);
    expect(totals.byCategory["Food & Dining"]).toBe(150);
  });
});
