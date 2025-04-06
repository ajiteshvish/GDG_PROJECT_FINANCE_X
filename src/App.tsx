import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, PiggyBank, ArrowRight } from 'lucide-react';
import ExpenseTracker from './components/ExpenseTracker';
import FinancialAdvice from './components/FinancialAdvice';
import InvestmentSuggestions from './components/InvestmentSuggestions';
import Dashboard from './components/Dashboard';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [financialData, setFinancialData] = useState({
    income: 0,
    expenses: [],
    savings: 0
  });

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-emerald-500" />
              <span className="ml-2 text-xl font-bold">FinanceWise</span>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'dashboard' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('expenses')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'expenses' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                Expense Tracker
              </button>
              <button
                onClick={() => setActiveTab('advice')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'advice' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                Financial Advice
              </button>
              <button
                onClick={() => setActiveTab('investments')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'investments' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                Investments
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard financialData={financialData} />}
        {activeTab === 'expenses' && <ExpenseTracker onUpdate={setFinancialData} financialData={financialData} />}
        {activeTab === 'advice' && <FinancialAdvice financialData={financialData} />}
        {activeTab === 'investments' && <InvestmentSuggestions financialData={financialData} />}
      </main>
    </div>
  );
}

export default App;