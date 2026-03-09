import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { CATEGORIES, type Category, type Transaction, type TransactionType, generateId } from "@/lib/finance";

interface TransactionFormProps {
  onAdd: (t: Transaction) => void;
}

export function TransactionForm({ onAdd }: TransactionFormProps) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<TransactionType>("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>("Food & Dining");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date>(new Date());

  const handleSubmit = () => {
    if (!amount || !description) return;
    onAdd({
      id: generateId(),
      amount: parseFloat(amount),
      category,
      description,
      date: date.toISOString(),
      type,
    });
    setAmount("");
    setDescription("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Transaction</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="flex gap-2">
            <Button
              variant={type === "expense" ? "default" : "secondary"}
              size="sm"
              className="flex-1"
              onClick={() => setType("expense")}
            >
              Expense
            </Button>
            <Button
              variant={type === "income" ? "default" : "secondary"}
              size="sm"
              className="flex-1"
              onClick={() => setType("income")}
            >
              Income
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Amount</Label>
            <Input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="font-mono text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Input
              placeholder="What was this for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => d && setDate(d)}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button onClick={handleSubmit} className="w-full" disabled={!amount || !description}>
            Add {type === "income" ? "Income" : "Expense"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
