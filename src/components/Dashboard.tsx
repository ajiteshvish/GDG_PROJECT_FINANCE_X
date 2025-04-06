import React from 'react';
import { PieChart, TrendingUp, DollarSign, ArrowUpRight } from 'lucide-react';

interface DashboardProps {
  financialData: {
    income: number;
    expenses: Array<{ amount: number; category: string }>;
    savings: number;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ financialData }) => {
  const totalExpenses = financialData.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const savingsRate = financialData.income > 0 ? ((financialData.income - totalExpenses) / financialData.income) * 100 : 0;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-100">Financial Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Monthly Income</p>
              <p className="text-2xl font-bold text-gray-100">${financialData.income.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-emerald-500" />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-100">${totalExpenses.toLocaleString()}</p>
            </div>
            <PieChart className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Savings Rate</p>
              <p className="text-2xl font-bold text-gray-100">{savingsRate.toFixed(1)}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-500" />
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
            <span>Track New Expense</span>
            <ArrowUpRight className="h-5 w-5" />
          </button>
          <button className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
            <span>Update Income</span>
            <ArrowUpRight className="h-5 w-5" />
          </button>
          <button className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
            <span>View Investment Tips</span>
            <ArrowUpRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;