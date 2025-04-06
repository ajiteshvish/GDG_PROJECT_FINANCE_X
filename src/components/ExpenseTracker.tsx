import React, { useState } from 'react';
import { Plus, Save } from 'lucide-react';

interface ExpenseTrackerProps {
  onUpdate: (data: any) => void;
  financialData: {
    income: number;
    expenses: Array<{ amount: number; category: string }>;
    savings: number;
  };
}

const ExpenseTracker: React.FC<ExpenseTrackerProps> = ({ onUpdate, financialData }) => {
  const [income, setIncome] = useState(financialData.income);
  const [newExpense, setNewExpense] = useState({ amount: '', category: '' });

  const categories = [
    'Housing', 'Transportation', 'Food', 'Utilities',
    'Healthcare', 'Entertainment', 'Shopping', 'Other'
  ];

  const handleAddExpense = () => {
    if (!newExpense.amount || !newExpense.category) return;

    const updatedData = {
      ...financialData,
      expenses: [...financialData.expenses, { 
        amount: parseFloat(newExpense.amount), 
        category: newExpense.category 
      }]
    };
    onUpdate(updatedData);
    setNewExpense({ amount: '', category: '' });
  };

  const handleIncomeUpdate = () => {
    onUpdate({
      ...financialData,
      income: parseFloat(income.toString())
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-100">Expense Tracker</h1>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Update Monthly Income</h2>
        <div className="flex gap-4">
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(parseFloat(e.target.value))}
            className="flex-1 bg-gray-700 text-gray-100 p-2 rounded-md"
            placeholder="Enter your monthly income"
          />
          <button
            onClick={handleIncomeUpdate}
            className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition flex items-center gap-2"
          >
            <Save className="h-5 w-5" />
            Save
          </button>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
        <div className="flex gap-4">
          <input
            type="number"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            className="flex-1 bg-gray-700 text-gray-100 p-2 rounded-md"
            placeholder="Amount"
          />
          <select
            value={newExpense.category}
            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
            className="flex-1 bg-gray-700 text-gray-100 p-2 rounded-md"
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <button
            onClick={handleAddExpense}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add
          </button>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Expense History</h2>
        <div className="space-y-4">
          {financialData.expenses.map((expense, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-700 p-4 rounded-md">
              <span className="text-gray-100">{expense.category}</span>
              <span className="text-gray-100">${expense.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;