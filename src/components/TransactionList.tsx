import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { type Transaction, CATEGORY_COLORS } from "@/lib/finance";

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export function TransactionList({ transactions, onDelete }: TransactionListProps) {
  const sorted = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (sorted.length === 0) {
    return <p className="text-sm text-muted-foreground py-8 text-center">No transactions this month</p>;
  }

  return (
    <div className="space-y-1">
      {sorted.map((t) => (
        <div
          key={t.id}
          className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-secondary/50 transition-colors group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="h-2 w-2 rounded-full shrink-0"
              style={{ backgroundColor: CATEGORY_COLORS[t.category] }}
            />
            <div className="min-w-0">
              <p className="text-sm truncate">{t.description}</p>
              <p className="text-xs text-muted-foreground">
                {t.category} · {format(new Date(t.date), "MMM d")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className={`font-mono text-sm ${t.type === "income" ? "text-success" : "text-foreground"}`}>
              {t.type === "income" ? "+" : "−"}${t.amount.toFixed(0)}
            </span>
            <button
              onClick={() => onDelete(t.id)}
              className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
