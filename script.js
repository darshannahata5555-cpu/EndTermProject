// ========================================
// STEP 1: STORE ALL DATA
// ========================================

// Array to store all transactions
let transactions = [];

// Available categories for income and expenses
const categories = {
    income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other Income'],
    expense: ['Food & Dining', 'Transportation', 'Shopping', 'Entertainment', 'Bills & Utilities', 'Healthcare', 'Education', 'Other Expense']
};

// Colors for the pie chart
const chartColors = [
    '#ef4444', '#f97316', '#f59e0b', '#eab308', 
    '#84cc16', '#22c55e', '#10b981', '#14b8a6',
    '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1'
];


// ========================================
// STEP 2: SAVE & LOAD DATA
// ========================================

// Load transactions from browser storage
function loadData() {
    const saved = localStorage.getItem('transactions');
    if (saved) {
        transactions = JSON.parse(saved);
    }
}

// Save transactions to browser storage
function saveData() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}


// ========================================
// STEP 3: SETUP THE PAGE
// ========================================

// When page loads, setup everything
window.onload = function() {
    loadData();
    fillCategoryDropdown();
    setTodayDate();
    setupButtons();
    refreshPage();
};

// Fill the category dropdown based on income/expense type
function fillCategoryDropdown() {
    const typeSelect = document.getElementById('type');
    const categorySelect = document.getElementById('category');
    const filterCategorySelect = document.getElementById('filterCategory');
    
    // When user changes type (income/expense), update categories
    typeSelect.onchange = function() {
        const type = typeSelect.value;
        categorySelect.innerHTML = '<option value="">Select category...</option>';
        
        // Add categories based on type
        categories[type].forEach(function(cat) {
            categorySelect.innerHTML += `<option value="${cat}">${cat}</option>`;
        });
    };
    
    // Trigger it once to fill categories on load
    typeSelect.onchange();
    
    // Fill filter dropdown with all categories
    filterCategorySelect.innerHTML = '<option value="all">All Categories</option>';
    const allCategories = [...categories.income, ...categories.expense];
    allCategories.forEach(function(cat) {
        filterCategorySelect.innerHTML += `<option value="${cat}">${cat}</option>`;
    });
}

// Set today's date in the date input
function setTodayDate() {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
}

// Setup all button clicks
function setupButtons() {
    // When form is submitted
    document.getElementById('transactionForm').onsubmit = function(e) {
        e.preventDefault();
        addTransaction();
    };
    
    // When filter changes
    document.getElementById('filterType').onchange = refreshPage;
    document.getElementById('filterCategory').onchange = refreshPage;
    
    // When clear button is clicked
    document.getElementById('clearBtn').onclick = clearAllData;
}


// ========================================
// STEP 4: ADD & DELETE TRANSACTIONS
// ========================================

// Add a new transaction
function addTransaction() {
    // Get form values
    const type = document.getElementById('type').value;
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;
    
    // Create transaction object
    const newTransaction = {
        id: Date.now(), // Unique ID using timestamp
        type: type,
        description: description,
        amount: amount,
        category: category,
        date: date
    };
    
    // Add to beginning of array
    transactions.unshift(newTransaction);
    
    // Save and refresh
    saveData();
    refreshPage();
    
    // Reset form
    document.getElementById('transactionForm').reset();
    setTodayDate();
    fillCategoryDropdown();
    
    // Show success message
    showSuccess();
}

// Delete a transaction
function deleteTransaction(id) {
    if (confirm('Delete this transaction?')) {
        // Keep all transactions except the one with this ID
        transactions = transactions.filter(function(t) {
            return t.id !== id;
        });
        
        saveData();
        refreshPage();
    }
}

// Clear all data
function clearAllData() {
    if (confirm('Clear all transactions? Cannot be undone!')) {
        transactions = [];
        saveData();
        refreshPage();
    }
}

// Show success message
function showSuccess() {
    const button = document.querySelector('.btn-primary');
    const oldText = button.textContent;
    button.textContent = '✓ Added!';
    button.style.background = '#10b981';
    
    setTimeout(function() {
        button.textContent = oldText;
        button.style.background = '';
    }, 2000);
}


// ========================================
// STEP 5: CALCULATE TOTALS
// ========================================

// Calculate total income
function getTotalIncome() {
    let total = 0;
    transactions.forEach(function(t) {
        if (t.type === 'income') {
            total += t.amount;
        }
    });
    return total;
}

// Calculate total expenses
function getTotalExpenses() {
    let total = 0;
    transactions.forEach(function(t) {
        if (t.type === 'expense') {
            total += t.amount;
        }
    });
    return total;
}

// Get filtered transactions based on selected filters
function getFilteredTransactions() {
    const filterType = document.getElementById('filterType').value;
    const filterCategory = document.getElementById('filterCategory').value;
    
    return transactions.filter(function(t) {
        const typeMatch = (filterType === 'all' || t.type === filterType);
        const categoryMatch = (filterCategory === 'all' || t.category === filterCategory);
        return typeMatch && categoryMatch;
    });
}


// ========================================
// STEP 6: UPDATE THE PAGE
// ========================================

// Refresh entire page
function refreshPage() {
    showSummaryCards();
    showTransactionList();
    showCategoryBars();
    drawPieChart();
}

// Update summary cards (income, expense, balance)
function showSummaryCards() {
    const income = getTotalIncome();
    const expenses = getTotalExpenses();
    const balance = income - expenses;
    
    document.getElementById('totalIncome').textContent = formatMoney(income);
    document.getElementById('totalExpenses').textContent = formatMoney(expenses);
    
    const balanceElement = document.getElementById('balance');
    balanceElement.textContent = formatMoney(balance);
    
    // Change color if negative
    if (balance < 0) {
        balanceElement.classList.add('negative');
    } else {
        balanceElement.classList.remove('negative');
    }
}

// Show transaction list
function showTransactionList() {
    const container = document.getElementById('transactionList');
    const filtered = getFilteredTransactions();
    
    // If no transactions
    if (filtered.length === 0) {
        container.innerHTML = '<p class="no-data">No transactions yet</p>';
        return;
    }
    
    // Clear container
    container.innerHTML = '';
    
    // Add each transaction
    filtered.forEach(function(t) {
        const sign = (t.type === 'income') ? '+' : '-';
        
        const html = `
            <div class="transaction-item ${t.type}">
                <div class="transaction-info">
                    <div class="transaction-description">${t.description}</div>
                    <div class="transaction-details">
                        <span class="transaction-category">${t.category}</span>
                        <span class="transaction-date">${formatDate(t.date)}</span>
                    </div>
                </div>
                <div class="transaction-amount">${sign}${formatMoney(t.amount)}</div>
                <button class="delete-btn" onclick="deleteTransaction(${t.id})">Delete</button>
            </div>
        `;
        
        container.innerHTML += html;
    });
}

// Show category analysis bars
function showCategoryBars() {
    const container = document.getElementById('categoryAnalysis');
    
    // If no transactions
    if (transactions.length === 0) {
        container.innerHTML = '<p class="no-data">No transactions yet</p>';
        return;
    }
    
    // Group by category
    const categoryTotals = {};
    
    transactions.forEach(function(t) {
        if (!categoryTotals[t.category]) {
            categoryTotals[t.category] = {
                type: t.type,
                total: 0,
                count: 0
            };
        }
        categoryTotals[t.category].total += t.amount;
        categoryTotals[t.category].count++;
    });
    
    // Convert to array and sort
    const sortedCategories = Object.keys(categoryTotals).sort(function(a, b) {
        return categoryTotals[b].total - categoryTotals[a].total;
    });
    
    // Find maximum for bar width
    let maxTotal = 0;
    sortedCategories.forEach(function(cat) {
        if (categoryTotals[cat].total > maxTotal) {
            maxTotal = categoryTotals[cat].total;
        }
    });
    
    // Clear container
    container.innerHTML = '';
    
    // Add each category
    sortedCategories.forEach(function(cat) {
        const data = categoryTotals[cat];
        const barWidth = (data.total / maxTotal) * 100;
        
        const html = `
            <div class="category-item ${data.type}">
                <div class="category-header">
                    <span class="category-name">${cat}</span>
                    <span class="category-total">${formatMoney(data.total)}</span>
                </div>
                <div class="category-bar">
                    <div class="category-bar-fill" style="width: ${barWidth}%"></div>
                </div>
                <div class="category-count">${data.count} transaction${data.count > 1 ? 's' : ''}</div>
            </div>
        `;
        
        container.innerHTML += html;
    });
}

// Draw pie chart for expenses
function drawPieChart() {
    const canvas = document.getElementById('expenseChart');
    const ctx = canvas.getContext('2d');
    const noDataMsg = document.getElementById('noDataMessage');
    const legend = document.getElementById('chartLegend');
    
    // Get expense totals by category
    const expenseTotals = {};
    
    transactions.forEach(function(t) {
        if (t.type === 'expense') {
            if (!expenseTotals[t.category]) {
                expenseTotals[t.category] = 0;
            }
            expenseTotals[t.category] += t.amount;
        }
    });
    
    const categoryNames = Object.keys(expenseTotals);
    
    // If no expenses
    if (categoryNames.length === 0) {
        noDataMsg.style.display = 'block';
        canvas.style.display = 'none';
        legend.innerHTML = '';
        return;
    }
    
    noDataMsg.style.display = 'none';
    canvas.style.display = 'block';
    
    // Calculate total expenses
    let totalExpenses = 0;
    categoryNames.forEach(function(cat) {
        totalExpenses += expenseTotals[cat];
    });
    
    // Setup canvas
    canvas.width = 300;
    canvas.height = 300;
    const centerX = 150;
    const centerY = 150;
    const radius = 140;
    
    // Starting angle (top of circle)
    let currentAngle = -Math.PI / 2;
    
    // Clear legend
    legend.innerHTML = '';
    
    // Draw each slice
    categoryNames.forEach(function(cat, index) {
        const value = expenseTotals[cat];
        const sliceAngle = (value / totalExpenses) * 2 * Math.PI;
        const endAngle = currentAngle + sliceAngle;
        
        // Draw pie slice
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = chartColors[index % chartColors.length];
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Add to legend
        const percentage = ((value / totalExpenses) * 100).toFixed(1);
        const legendHTML = `
            <div class="legend-item">
                <div class="legend-color" style="background-color: ${chartColors[index % chartColors.length]}"></div>
                <span class="legend-label">${cat}</span>
                <span class="legend-value">${percentage}%</span>
            </div>
        `;
        legend.innerHTML += legendHTML;
        
        currentAngle = endAngle;
    });
}


// ========================================
// STEP 7: HELPER FUNCTIONS
// ========================================

// Format number as Indian Rupees
function formatMoney(amount) {
    return '₹' + amount.toFixed(2);
}

// Format date nicely
function formatDate(dateString) {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}
