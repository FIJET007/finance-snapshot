import { useState } from "react";
import { CATEGORIES, CATEGORY_COLORS, type Budget, type Category } from "@/lib/finance";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Pencil, Check } from "lucide-react";

interface BudgetOverviewProps {
  budgets: Budget[];
  byCategory: Record<Category, number>;
  onUpdateBudget: (category: Category, limit: number) => void;
}

export function BudgetOverview({ budgets, byCategory, onUpdateBudget }: BudgetOverviewProps) {
  const [editing, setEditing] = useState<Category | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleEdit = (cat: Category, currentLimit: number) => {
    setEditing(cat);
    setEditValue(currentLimit.toString());
  };

  const handleSave = (cat: Category) => {
    const val = parseFloat(editValue);
    if (!isNaN(val) && val > 0) onUpdateBudget(cat, val);
    setEditing(null);
  };

  return (
    <div className="space-y-4">
      {CATEGORIES.map((cat) => {
        const budget = budgets.find((b) => b.category === cat);
        const limit = budget?.limit ?? 0;
        const spent = byCategory[cat] ?? 0;
        const pct = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;
        const over = spent > limit;

        return (
          <div key={cat} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: CATEGORY_COLORS[cat] }}
                />
                <span>{cat}</span>
              </div>
              <div className="flex items-center gap-2">
                {editing === cat ? (
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">$</span>
                    <Input
                      className="h-6 w-20 font-mono text-xs"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSave(cat)}
                      autoFocus
                    />
                    <button onClick={() => handleSave(cat)} className="text-primary hover:text-primary/80">
                      <Check className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="font-mono text-xs">
                      <span className={over ? "text-destructive" : "text-foreground"}>
                        ${spent.toFixed(0)}
                      </span>
                      <span className="text-muted-foreground"> / ${limit.toFixed(0)}</span>
                    </span>
                    <button onClick={() => handleEdit(cat, limit)} className="text-muted-foreground hover:text-foreground transition-colors">
                      <Pencil className="h-3 w-3" />
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="relative">
              <Progress value={pct} className="h-2" />
              {over && (
                <span className="absolute -top-0.5 right-0 text-[10px] font-mono text-destructive">
                  over budget
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
