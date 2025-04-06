import React from 'react';
import { TrendingUp, AlertCircle, DollarSign, ArrowUpRight } from 'lucide-react';

interface InvestmentSuggestionsProps {
  financialData: {
    income: number;
    expenses: Array<{ amount: number; category: string }>;
    savings: number;
  };
}

const InvestmentSuggestions: React.FC<InvestmentSuggestionsProps> = ({ financialData }) => {
  const totalExpenses = financialData.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const monthlySavings = financialData.income - totalExpenses;

  const investmentOptions = [
    {
      name: 'Index Funds',
      risk: 'Moderate',
      description: 'Diversified investment tracking market indices like S&P 500',
      recommendedAllocation: 40,
      amount: (monthlySavings * 0.4).toFixed(2)
    },
    {
      name: 'Blue-Chip Stocks',
      risk: 'Moderate-High',
      description: 'Stable, large-cap companies with proven track records',
      recommendedAllocation: 30,
      amount: (monthlySavings * 0.3).toFixed(2)
    },
    {
      name: 'Government Bonds',
      risk: 'Low',
      description: 'Safe, fixed-income investments backed by government',
      recommendedAllocation: 20,
      amount: (monthlySavings * 0.2).toFixed(2)
    },
    {
      name: 'High-Yield Savings',
      risk: 'Very Low',
      description: 'Liquid savings with better interest rates than traditional accounts',
      recommendedAllocation: 10,
      amount: (monthlySavings * 0.1).toFixed(2)
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-100">Investment Suggestions</h1>

      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="h-5 w-5 text-amber-500" />
          <p className="text-amber-500">
            This is general advice. Please consult with a financial advisor for personalized recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Monthly Investment Capacity</h2>
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Available for Investment</span>
                <span className="text-2xl font-bold text-gray-100">
                  ${monthlySavings.toLocaleString()}
                </span>
              </div>
              <div className="text-sm text-gray-400">
                Based on your current income and expenses
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Risk Profile</h2>
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                <span className="text-gray-100">Balanced Growth Strategy</span>
              </div>
              <p className="text-sm text-gray-400">
                Recommended for steady long-term wealth building with moderate risk tolerance
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-6">Recommended Investment Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {investmentOptions.map((option, index) => (
            <div key={index} className="bg-gray-700 p-6 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{option.name}</h3>
                  <span className={`text-sm px-2 py-1 rounded ${
                    option.risk === 'Low' ? 'bg-green-900 text-green-300' :
                    option.risk === 'Moderate' ? 'bg-blue-900 text-blue-300' :
                    'bg-amber-900 text-amber-300'
                  }`}>
                    {option.risk} Risk
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">${option.amount}</div>
                  <div className="text-sm text-gray-400">{option.recommendedAllocation}% Allocation</div>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">{option.description}</p>
              <button className="w-full bg-gray-600 hover:bg-gray-500 text-white py-2 rounded-md transition flex items-center justify-center gap-2">
                Learn More
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Market Insights</h2>
        <div className="space-y-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              <h3 className="font-semibold">Current Market Trends</h3>
            </div>
            <p className="text-gray-300">
              The market is showing strong potential in technology and renewable energy sectors.
              Consider allocating a portion of your investment to these growing industries.
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-5 w-5 text-emerald-500" />
              <h3 className="font-semibold">Investment Strategy</h3>
            </div>
            <p className="text-gray-300">
              Dollar-cost averaging is recommended for steady investment growth.
              Consider setting up automatic monthly investments based on the allocations above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentSuggestions;