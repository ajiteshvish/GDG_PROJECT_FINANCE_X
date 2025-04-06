// State management
let financialData = {
    income: 0,
    expenses: [],
    savings: 0
};

// Initialize Lucide icons
lucide.createIcons();

// Tab switching
function switchTab(tabId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    document.getElementById(tabId).classList.add('active');

    // Update navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');

    // Update displays
    updateDisplays();
}

// Initialize tab switching
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Update Income
function updateIncome() {
    const incomeInput = document.getElementById('income-input');
    const income = parseFloat(incomeInput.value) || 0;
    
    financialData.income = income;
    incomeInput.value = '';
    
    updateDisplays();
}

// Add Expense
function addExpense() {
    const amountInput = document.getElementById('expense-amount');
    const categorySelect = document.getElementById('expense-category');
    
    const amount = parseFloat(amountInput.value);
    const category = categorySelect.value;

    if (!amount || !category) return;

    financialData.expenses.push({ amount, category });
    
    amountInput.value = '';
    categorySelect.value = '';
    
    updateDisplays();
}

// Calculate total expenses
function calculateTotalExpenses() {
    return financialData.expenses.reduce((sum, expense) => sum + expense.amount, 0);
}

// Calculate savings rate
function calculateSavingsRate() {
    const totalExpenses = calculateTotalExpenses();
    return financialData.income > 0 
        ? ((financialData.income - totalExpenses) / financialData.income) * 100 
        : 0;
}

// Update all displays
function updateDisplays() {
    const totalExpenses = calculateTotalExpenses();
    const savingsRate = calculateSavingsRate();
    const monthlySavings = financialData.income - totalExpenses;

    // Update Dashboard
    document.getElementById('income-display').textContent = formatCurrency(financialData.income);
    document.getElementById('expenses-display').textContent = formatCurrency(totalExpenses);
    document.getElementById('savings-rate-display').textContent = `${savingsRate.toFixed(1)}%`;

    // Update Expense History
    const expenseHistory = document.getElementById('expense-history');
    expenseHistory.innerHTML = financialData.expenses.map(expense => `
        <div class="expense-item">
            <span>${expense.category}</span>
            <span>${formatCurrency(expense.amount)}</span>
        </div>
    `).join('');

    // Update Financial Advice
    document.getElementById('advice-income').textContent = formatCurrency(financialData.income);
    document.getElementById('advice-expenses').textContent = formatCurrency(totalExpenses);
    document.getElementById('advice-savings').textContent = formatCurrency(monthlySavings);
    document.getElementById('advice-rate').textContent = `${savingsRate.toFixed(1)}%`;

    // Update Financial Goals
    document.getElementById('emergency-fund-target').textContent = 
        `Target: ${formatCurrency(financialData.income * 6)}`;
    document.getElementById('retirement-goal').textContent = 
        `Monthly Goal: ${formatCurrency(financialData.income * 0.15)}`;
    document.getElementById('debt-payment').textContent = 
        `Available: ${formatCurrency(monthlySavings * 0.5)}`;

    // Update Investment Amount
    document.getElementById('investment-amount').textContent = formatCurrency(monthlySavings);

    // Update Recommendations
    updateRecommendations();
    updateInvestmentOptions();
}

// Update recommendations based on financial data
function updateRecommendations() {
    const recommendationsDiv = document.getElementById('advice-recommendations');
    const recommendations = [];
    
    const savingsRate = calculateSavingsRate();
    const totalExpenses = calculateTotalExpenses();
    const monthlySavings = financialData.income - totalExpenses;

    if (savingsRate < 20) {
        recommendations.push({
            type: 'warning',
            title: 'Increase Your Savings',
            message: 'Your current savings rate is below the recommended 20%. Consider reducing non-essential expenses.'
        });
    }

    const housingExpenses = financialData.expenses
        .filter(e => e.category === 'Housing')
        .reduce((sum, e) => sum + e.amount, 0);
    
    if (housingExpenses > financialData.income * 0.3) {
        recommendations.push({
            type: 'warning',
            title: 'High Housing Costs',
            message: 'Your housing expenses exceed 30% of your income. Consider finding more affordable housing options.'
        });
    }

    if (monthlySavings > 0) {
        recommendations.push({
            type: 'success',
            title: 'Emergency Fund',
            message: `With your current savings rate, you could build a 6-month emergency fund in ${Math.ceil((financialData.income * 6) / monthlySavings)} months.`
        });
    }

    if (savingsRate >= 20) {
        recommendations.push({
            type: 'success',
            title: 'Good Savings Rate',
            message: 'You\'re maintaining a healthy savings rate. Consider investing the surplus in diversified portfolios.'
        });
    }

    recommendationsDiv.innerHTML = recommendations.map(rec => `
        <div class="recommendation ${rec.type}">
            <div class="recommendation-header">
                <i data-lucide="${rec.type === 'warning' ? 'alert-triangle' : 'check-circle'}"></i>
                <h3>${rec.title}</h3>
            </div>
            <p>${rec.message}</p>
        </div>
    `).join('');

    lucide.createIcons();
}

// Update investment options
function updateInvestmentOptions() {
    const investmentOptionsDiv = document.getElementById('investment-options');
    const monthlySavings = financialData.income - calculateTotalExpenses();

    const options = [
        {
            name: 'Index Funds',
            risk: 'moderate',
            description: 'Diversified investment tracking market indices like S&P 500',
            allocation: 40
        },
        {
            name: 'Blue-Chip Stocks',
            risk: 'high',
            description: 'Stable, large-cap companies with proven track records',
            allocation: 30
        },
        {
            name: 'Government Bonds',
            risk: 'low',
            description: 'Safe, fixed-income investments backed by government',
            allocation: 20
        },
        {
            name: 'High-Yield Savings',
            risk: 'low',
            description: 'Liquid savings with better interest rates than traditional accounts',
            allocation: 10
        }
    ];

    investmentOptionsDiv.innerHTML = options.map(option => `
        <div class="investment-option">
            <div class="option-header">
                <div>
                    <h3>${option.name}</h3>
                    <span class="risk-badge ${option.risk}">${option.risk.charAt(0).toUpperCase() + option.risk.slice(1)} Risk</span>
                </div>
                <div class="option-amount">
                    <div class="amount">${formatCurrency(monthlySavings * option.allocation / 100)}</div>
                    <div class="allocation">${option.allocation}% Allocation</div>
                </div>
            </div>
            <p>${option.description}</p>
        </div>
    `).join('');
}

// Initialize the application
updateDisplays();