import React from 'react';
import { AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

interface FinancialAdviceProps {
  financialData: {
    income: number;
    expenses: Array<{ amount: number; category: string }>;
    savings: number;
  };
}

const FinancialAdvice: React.FC<FinancialAdviceProps> = ({ financialData }) => {
  const totalExpenses = financialData.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const monthlySavings = financialData.income - totalExpenses;
  const savingsRate = financialData.income > 0 ? (monthlySavings / financialData.income) * 100 : 0;

  const getAdvice = () => {
    const advice = [];

    if (savingsRate < 20) {
      advice.push({
        type: 'warning',
        title: 'Increase Your Savings',
        message: 'Your current savings rate is below the recommended 20%. Consider reducing non-essential expenses.'
      });
    }

    const housingExpenses = financialData.expenses
      .filter(e => e.category === 'Housing')
      .reduce((sum, e) => sum + e.amount, 0);
    
    if (housingExpenses > financialData.income * 0.3) {
      advice.push({
        type: 'warning',
        title: 'High Housing Costs',
        message: 'Your housing expenses exceed 30% of your income. Consider finding more affordable housing options.'
      });
    }

    if (monthlySavings > 0) {
      advice.push({
        type: 'success',
        title: 'Emergency Fund',
        message: `With your current savings rate, you could build a 6-month emergency fund in ${Math.ceil((financialData.income * 6) / monthlySavings)} months.`
      });
    }

    if (savingsRate >= 20) {
      advice.push({
        type: 'success',
        title: 'Good Savings Rate',
        message: 'You\'re maintaining a healthy savings rate. Consider investing the surplus in diversified portfolios.'
      });
    }

    return advice;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-100">Financial Advice</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Financial Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Monthly Income</span>
              <span className="text-gray-100">${financialData.income.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Expenses</span>
              <span className="text-gray-100">${totalExpenses.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Monthly Savings</span>
              <span className="text-gray-100">${monthlySavings.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Savings Rate</span>
              <span className="text-gray-100">{savingsRate.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
          <div className="space-y-4">
            {getAdvice().map((advice, index) => (
              <div key={index} className={`p-4 rounded-lg ${
                advice.type === 'warning' ? 'bg-amber-900/50' : 'bg-emerald-900/50'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {advice.type === 'warning' ? (
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                  )}
                  <h3 className="font-semibold">{advice.title}</h3>
                </div>
                <p className="text-gray-300">{advice.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Financial Goals Calculator</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Emergency Fund</h3>
            <p className="text-gray-300">Target: ${(financialData.income * 6).toLocaleString()}</p>
            <p className="text-gray-400 text-sm">6 months of income</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Retirement Savings</h3>
            <p className="text-gray-300">Monthly Goal: ${(financialData.income * 0.15).toLocaleString()}</p>
            <p className="text-gray-400 text-sm">15% of monthly income</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Debt Payment</h3>
            <p className="text-gray-300">Available: ${(monthlySavings * 0.5).toLocaleString()}</p>
            <p className="text-gray-400 text-sm">50% of savings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialAdvice;