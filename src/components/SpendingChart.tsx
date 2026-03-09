import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { CATEGORIES, CATEGORY_COLORS, type Category } from "@/lib/finance";

interface SpendingChartProps {
  byCategory: Record<Category, number>;
  totalExpenses: number;
}

export function SpendingChart({ byCategory, totalExpenses }: SpendingChartProps) {
  const data = CATEGORIES.map((c) => ({
    name: c,
    value: byCategory[c],
    color: CATEGORY_COLORS[c],
  })).filter((d) => d.value > 0);

  if (data.length === 0) {
    return (
      <div className="flex h-[200px] items-center justify-center text-muted-foreground text-sm">
        No expenses yet
      </div>
    );
  }

  return (
    <div className="relative h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "hsl(30, 8%, 12%)",
              border: "1px solid hsl(30, 6%, 18%)",
              borderRadius: "8px",
              color: "hsl(40, 20%, 92%)",
              fontFamily: "'DM Mono', monospace",
              fontSize: "13px",
            }}
            formatter={(value: number) => [`$${value.toFixed(0)}`, ""]}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <p className="text-2xl font-semibold font-mono">${totalExpenses.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">total spent</p>
        </div>
      </div>
    </div>
  );
}
