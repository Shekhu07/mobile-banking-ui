// ==========================================================================
// AXE BANK - MOBILE UI CONTROLLER STATE
// ==========================================================================

// Global state holding balance, limits, and mock transactions
const state = {
    balance: 12450.80,
    savingsTarget: 15000.00,
    savingsCurrent: 12450.00,
    limit: 2500,
    isBalanceHidden: false,
    theme: 'default',
    transactions: [
        {
            id: 'TXN-940384-H',
            title: 'Starbucks Coffee',
            category: 'food',
            amount: -12.50,
            timestamp: 'Today, 08:32 AM',
            logo: '☕',
            method: 'Axe Visa Card (*4309)',
            status: 'Completed',
            points: 6
        },
        {
            id: 'TXN-850293-K',
            title: 'Weekly Grocery Store',
            category: 'food',
            amount: -142.20,
            timestamp: 'Yesterday, 18:45 PM',
            logo: '🛒',
            method: 'Axe Visa Card (*4309)',
            status: 'Completed',
            points: 70
        },
        {
            id: 'TXN-382940-L',
            title: 'Salary Deposit (Acme Corp)',
            category: 'salary',
            amount: 2850.00,
            timestamp: 'May 20, 10:00 AM',
            logo: '💼',
            method: 'Axe Direct Deposit',
            status: 'Completed',
            points: 150
        },
        {
            id: 'TXN-104928-Q',
            title: 'Target Superstore',
            category: 'shopping',
            amount: -89.99,
            timestamp: 'May 19, 14:15 PM',
            logo: '🎯',
            method: 'Axe Visa Card (*4309)',
            status: 'Completed',
            points: 45
        },
        {
            id: 'TXN-839201-P',
            title: 'Monthly Electric Bill',
            category: 'utilities',
            amount: -120.00,
            timestamp: 'May 15, 09:00 AM',
            logo: '⚡',
            method: 'Axe Checking Account',
            status: 'Completed',
            points: 0
        },
        {
            id: 'TXN-294018-T',
            title: 'Uber Ride City Center',
            category: 'travel',
            amount: -24.50,
            timestamp: 'May 14, 21:30 PM',
            logo: '🚗',
            method: 'Axe Visa Card (*4309)',
            status: 'Completed',
            points: 12
        }
    ]
};

// ==========================================================================
// DOM ELEMENT SELECTORS
// ==========================================================================
const mainBalanceEl = document.getElementById('main-balance-val');
const incomeValEl = document.getElementById('income-val');
const expensesValEl = document.getElementById('expenses-val');
const savingsProgressRing = document.getElementById('savings-progress-ring');
const savingsProgressText = document.getElementById('savings-progress-text');
const transactionsListContainer = document.getElementById('transactions-list-container');
const btnToggleBalance = document.getElementById('toggle-balance-visibility');
const balanceEyeIcon = document.getElementById('balance-eye-icon');
const searchInput = document.getElementById('transaction-search');

// Simulator Sidebar Elements
const simBalanceInput = document.getElementById('sim-balance');
const simSavingsTargetInput = document.getElementById('sim-savings-target');
const txTitleInput = document.getElementById('tx-title');
const txAmountInput = document.getElementById('tx-amount');
const txTypeSelect = document.getElementById('tx-type');
const txCategorySelect = document.getElementById('tx-category');
const btnAddTx = document.getElementById('btn-add-tx');
const colorBtns = document.querySelectorAll('.color-btn');

// Detail Bottom Sheet elements
const txDetailsOverlay = document.getElementById('tx-details-overlay');
const btnCloseTxDetails = document.getElementById('btn-close-tx-details');
const detailCategoryBadge = document.getElementById('detail-category-badge');
const detailLogoBox = document.getElementById('detail-logo-box');
const detailTitle = document.getElementById('detail-title');
const detailTimestamp = document.getElementById('detail-timestamp');
const detailAmount = document.getElementById('detail-amount');
const detailPaymentMethod = document.getElementById('detail-payment-method');
const detailTxId = document.getElementById('detail-tx-id');
const detailPoints = document.getElementById('detail-points');

// Card settings elements
const creditCardElement = document.getElementById('credit-card-element');
const switchFreeze = document.getElementById('switch-freeze');
const switchOnline = document.getElementById('switch-online');
const limitSlider = document.getElementById('limit-slider');
const limitBadgeVal = document.getElementById('limit-badge-val');

// Notification Tray
const notificationTray = document.getElementById('notification-tray');

// ==========================================================================
// CORE UI FUNCTIONS
// ==========================================================================

// Format number into USD currency
function formatCurrency(amount) {
    return amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Update app clocks dynamically (matches local real-time inside the mockup)
function updateClock() {
    const timeDisplay = document.getElementById('status-time');
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    if (timeDisplay) {
        timeDisplay.textContent = `${hours}:${minutes}`;
    }
}
setInterval(updateClock, 1000);
updateClock();

// Re-render and calculate financials
function updateFinancialDashboard() {
    // 1. Balance Display
    if (state.isBalanceHidden) {
        mainBalanceEl.textContent = '••••••';
        balanceEyeIcon.textContent = 'visibility_off';
    } else {
        mainBalanceEl.textContent = formatCurrency(state.balance);
        balanceEyeIcon.textContent = 'visibility';
    }

    // 2. Income/Expense Totals from transaction history
    let totalIncome = 0;
    let totalExpenses = 0;
    
    state.transactions.forEach(tx => {
        if (tx.amount > 0) {
            totalIncome += tx.amount;
        } else {
            totalExpenses += Math.abs(tx.amount);
        }
    });

    incomeValEl.textContent = `+$${formatCurrency(totalIncome)}`;
    expensesValEl.textContent = `-$${formatCurrency(totalExpenses)}`;

    // Set relative progress bar fills
    const totalFlow = totalIncome + totalExpenses;
    const flowIncomeFill = document.querySelector('.flow-fill-income');
    const flowExpenseFill = document.querySelector('.flow-fill-expense');
    
    if (totalFlow > 0) {
        const incomePct = (totalIncome / totalFlow) * 100;
        const expensePct = (totalExpenses / totalFlow) * 100;
        flowIncomeFill.style.width = `${incomePct}%`;
        flowExpenseFill.style.width = `${expensePct}%`;
    } else {
        flowIncomeFill.style.width = '50%';
        flowExpenseFill.style.width = '50%';
    }

    // 3. Savings Goal Metric Circular Chart
    const target = state.savingsTarget;
    const pct = Math.min(Math.round((state.balance / target) * 100), 100);
    savingsProgressText.textContent = `${pct}%`;
    // circle radius r=15.9155 has circumference of exactly 100, stroke-dasharray pattern is stroke, gap
    savingsProgressRing.setAttribute('stroke-dasharray', `${pct}, 100`);

    // 4. Update Spending Doughnut chart breakdown
    updateSpendingBreakdownChart(totalExpenses);

    // 5. Update UI values in the Simulator inputs if they are not active
    if (document.activeElement !== simBalanceInput) {
        simBalanceInput.value = state.balance.toFixed(2);
    }
}

// Draw/Update the Category Spending Chart
function updateSpendingBreakdownChart(totalExpenses) {
    const categories = {
        food: 0,
        shopping: 0,
        utilities: 0,
        travel: 0
    };

    state.transactions.forEach(tx => {
        if (tx.amount < 0 && categories[tx.category] !== undefined) {
            categories[tx.category] += Math.abs(tx.amount);
        }
    });

    const foodAmt = categories.food;
    const shoppingAmt = categories.shopping;
    const utilitiesAmt = categories.utilities;
    const travelAmt = categories.travel;
    const computedTotal = foodAmt + shoppingAmt + utilitiesAmt + travelAmt;

    // Update legend values
    document.querySelector('.legend-item:nth-child(1) .legend-value').textContent = 
        `$${formatCurrency(foodAmt)} (${computedTotal > 0 ? Math.round((foodAmt/computedTotal)*100) : 0}%)`;
    document.querySelector('.legend-item:nth-child(2) .legend-value').textContent = 
        `$${formatCurrency(shoppingAmt)} (${computedTotal > 0 ? Math.round((shoppingAmt/computedTotal)*100) : 0}%)`;
    document.querySelector('.legend-item:nth-child(3) .legend-value').textContent = 
        `$${formatCurrency(utilitiesAmt)} (${computedTotal > 0 ? Math.round((utilitiesAmt/computedTotal)*100) : 0}%)`;
    document.querySelector('.legend-item:nth-child(4) .legend-value').textContent = 
        `$${formatCurrency(travelAmt)} (${computedTotal > 0 ? Math.round((travelAmt/computedTotal)*100) : 0}%)`;

    // Center total spent number
    document.querySelector('.donut-total').textContent = `$${Math.round(computedTotal)}`;

    // Recompute SVG segments
    // segments: Food, Shopping, Bills (Utilities), Travel
    const segmentFood = document.querySelector('.segment-food');
    const segmentShopping = document.querySelector('.segment-shopping');
    const segmentBills = document.querySelector('.segment-bills');
    const segmentTravel = document.querySelector('.segment-travel');

    if (computedTotal > 0) {
        const foodPct = (foodAmt / computedTotal) * 100;
        const shoppingPct = (shoppingAmt / computedTotal) * 100;
        const billsPct = (utilitiesAmt / computedTotal) * 100;
        const travelPct = (travelAmt / computedTotal) * 100;

        segmentFood.setAttribute('stroke-dasharray', `${foodPct} ${100 - foodPct}`);
        segmentFood.setAttribute('stroke-dashoffset', '0');

        segmentShopping.setAttribute('stroke-dasharray', `${shoppingPct} ${100 - shoppingPct}`);
        segmentShopping.setAttribute('stroke-dashoffset', `-${foodPct}`);

        segmentBills.setAttribute('stroke-dasharray', `${billsPct} ${100 - billsPct}`);
        segmentBills.setAttribute('stroke-dashoffset', `-${foodPct + shoppingPct}`);

        segmentTravel.setAttribute('stroke-dasharray', `${travelPct} ${100 - travelPct}`);
        segmentTravel.setAttribute('stroke-dashoffset', `-${foodPct + shoppingPct + billsPct}`);
    } else {
        segmentFood.setAttribute('stroke-dasharray', '0 100');
        segmentShopping.setAttribute('stroke-dasharray', '0 100');
        segmentBills.setAttribute('stroke-dasharray', '0 100');
        segmentTravel.setAttribute('stroke-dasharray', '0 100');
    }

    // Update progress bars on analytics screen
    updateAnalyticsScreenBudgets(categories);
}

// Update budget progress cards on analytics tab
function updateAnalyticsScreenBudgets(categories) {
    const caps = {
        food: 1000,
        shopping: 1200,
        travel: 400
    };

    // Update Food limit
    const foodRatioText = document.querySelector('.budget-limits-section .budget-progress-card:nth-child(1) .budget-ratio');
    const foodBar = document.querySelector('.budget-limits-section .budget-progress-card:nth-child(1) .progress-bar-front');
    const foodSubtext = document.querySelector('.budget-limits-section .budget-progress-card:nth-child(1) .budget-alert-subtext');
    if (foodRatioText && foodBar) {
        const spent = Math.round(categories.food);
        const pct = Math.min((spent / caps.food) * 100, 100);
        foodRatioText.innerHTML = `<strong>$${spent.toLocaleString()}</strong> / $${caps.food.toLocaleString()}`;
        foodBar.style.width = `${pct}%`;
        if (pct >= 85) {
            foodBar.className = 'progress-bar-front danger';
            foodSubtext.innerHTML = `<span class="material-symbols-outlined icon-inline text-error">warning</span> Danger! ${Math.round(pct)}% of monthly budget exceeded.`;
        } else if (pct >= 70) {
            foodBar.className = 'progress-bar-front warning';
            foodSubtext.innerHTML = `<span class="material-symbols-outlined icon-inline text-warning">warning</span> Warning! ${Math.round(pct)}% of monthly budget reached.`;
        } else {
            foodBar.className = 'progress-bar-front';
            foodSubtext.textContent = `Safe zone. $${caps.food - spent} remaining.`;
        }
    }

    // Update Shopping limit
    const shoppingRatioText = document.querySelector('.budget-limits-section .budget-progress-card:nth-child(2) .budget-ratio');
    const shoppingBar = document.querySelector('.budget-limits-section .budget-progress-card:nth-child(2) .progress-bar-front');
    const shoppingSubtext = document.querySelector('.budget-limits-section .budget-progress-card:nth-child(2) .budget-alert-subtext');
    if (shoppingRatioText && shoppingBar) {
        const spent = Math.round(categories.shopping);
        const pct = Math.min((spent / caps.shopping) * 100, 100);
        shoppingRatioText.innerHTML = `<strong>$${spent.toLocaleString()}</strong> / $${caps.shopping.toLocaleString()}`;
        shoppingBar.style.width = `${pct}%`;
        if (pct >= 80) {
            shoppingBar.className = 'progress-bar-front danger';
            shoppingSubtext.innerHTML = `<span class="material-symbols-outlined icon-inline text-error">warning</span> Approaching cap. $${caps.shopping - spent} left.`;
        } else {
            shoppingBar.className = 'progress-bar-front';
            shoppingSubtext.textContent = `Safe zone. $${caps.shopping - spent} remaining.`;
        }
    }

    // Update Travel limit
    const travelRatioText = document.querySelector('.budget-limits-section .budget-progress-card:nth-child(3) .budget-ratio');
    const travelBar = document.querySelector('.budget-limits-section .budget-progress-card:nth-child(3) .progress-bar-front');
    const travelSubtext = document.querySelector('.budget-limits-section .budget-progress-card:nth-child(3) .budget-alert-subtext');
    if (travelRatioText && travelBar) {
        const spent = Math.round(categories.travel);
        const pct = Math.min((spent / caps.travel) * 100, 100);
        travelRatioText.innerHTML = `<strong>$${spent.toLocaleString()}</strong> / $${caps.travel.toLocaleString()}`;
        travelBar.style.width = `${pct}%`;
        if (pct >= 80) {
            travelBar.className = 'progress-bar-front danger';
            travelSubtext.innerHTML = `<span class="material-symbols-outlined icon-inline text-error">warning</span> Approaching limit soon.`;
        } else {
            travelBar.className = 'progress-bar-front';
            travelSubtext.textContent = `Under budget. $${caps.travel - spent} remaining.`;
        }
    }
}

// Render dynamic transactions list matching search filter
function renderTransactions(filterQuery = '') {
    transactionsListContainer.innerHTML = '';
    const q = filterQuery.toLowerCase().trim();

    const filtered = state.transactions.filter(tx => {
        return tx.title.toLowerCase().includes(q) || tx.category.toLowerCase().includes(q);
    });

    if (filtered.length === 0) {
        transactionsListContainer.innerHTML = `
            <div class="empty-state" style="text-align: center; padding: 20px; color: var(--md-sys-color-on-surface-variant); font-size: 0.8rem;">
                <span class="material-symbols-outlined" style="font-size: 32px; margin-bottom: 8px;">search_off</span>
                <p>No matching transactions found</p>
            </div>
        `;
        return;
    }

    filtered.forEach(tx => {
        const isDebit = tx.amount < 0;
        const amountText = isDebit ? `-$${formatCurrency(Math.abs(tx.amount))}` : `+$${formatCurrency(tx.amount)}`;
        const amountClass = isDebit ? 'debit' : 'credit';
        
        const tile = document.createElement('div');
        tile.className = 'transaction-tile';
        tile.innerHTML = `
            <div class="tx-left">
                <div class="tx-icon-box">${tx.logo}</div>
                <div class="tx-text">
                    <span class="tx-title">${escapeHtml(tx.title)}</span>
                    <span class="tx-subtitle">${tx.timestamp}</span>
                </div>
            </div>
            <div class="tx-right">
                <span class="tx-amount ${amountClass}">${amountText}</span>
                <span class="tx-status-badge text-success">${tx.status}</span>
            </div>
        `;

        // Click to open detailed bottom sheet
        tile.addEventListener('click', () => {
            openTransactionDetails(tx);
        });

        transactionsListContainer.appendChild(tile);
    });
}

// Simple HTML escaping helper for inputs
function escapeHtml(str) {
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#039;');
}

// ==========================================================================
// TRANSACTIONS SHEET & INTERACTION
// ==========================================================================
function openTransactionDetails(tx) {
    detailCategoryBadge.textContent = tx.category.toUpperCase();
    detailLogoBox.textContent = tx.logo;
    detailTitle.textContent = tx.title;
    detailTimestamp.textContent = tx.timestamp;

    const isDebit = tx.amount < 0;
    detailAmount.textContent = isDebit ? `-$${formatCurrency(Math.abs(tx.amount))}` : `+$${formatCurrency(tx.amount)}`;
    detailAmount.className = `detail-amount-box ${isDebit ? 'debit' : 'credit'}`;
    
    detailPaymentMethod.textContent = tx.method;
    detailTxId.textContent = tx.id;
    detailPoints.textContent = `+${tx.points} loyalty points earned`;

    txDetailsOverlay.classList.add('active');
    txDetailsOverlay.setAttribute('aria-hidden', 'false');
}

function closeTransactionDetails() {
    txDetailsOverlay.classList.remove('active');
    txDetailsOverlay.setAttribute('aria-hidden', 'true');
}

// ==========================================================================
// SCREEN NAVIGATION & TABS
// ==========================================================================
function switchTab(tabName) {
    // 1. Update Bottom Navigation active state
    const navItems = document.querySelectorAll('.app-nav-bar .nav-item');
    navItems.forEach(item => {
        const btnTab = item.getAttribute('data-tab');
        if (btnTab === tabName) {
            item.classList.add('active');
            item.querySelector('.material-symbols-outlined').classList.add('font-filled');
        } else {
            item.classList.remove('active');
            item.querySelector('.material-symbols-outlined').classList.remove('font-filled');
        }
    });

    // 2. Hide all page sheets, display selected page sheet
    const pages = document.querySelectorAll('.phone-screen-content .app-tab-page');
    pages.forEach(page => {
        const pageId = page.getAttribute('id');
        if (pageId === `tab-${tabName}`) {
            page.classList.add('active');
        } else {
            page.classList.remove('active');
        }
    });

    // Close transaction bottom sheet on screen switch
    closeTransactionDetails();
}

// Attach bottom nav button click events
document.querySelectorAll('.app-nav-bar .nav-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const tab = btn.getAttribute('data-tab');
        switchTab(tab);
    });
});

// Quick action link dispatcher
window.quickAction = function(action) {
    if (action === 'send' || action === 'scan' || action === 'bills' || action === 'vault') {
        showToast('Info', `Starting: ${action.toUpperCase()} workflow simulation.`, false);
    } else if (action === 'more') {
        showToast('Info', 'Full widget catalogue loaded inside mobile memory.', false);
    } else if (action === 'history') {
        searchInput.focus();
        showToast('Help', 'Filter logs using the search bar above.', false);
    }
};

window.switchTab = switchTab; // Expose globally for quick action cards link

// ==========================================================================
// CREDIT CARD INTERACTION AND CONTROLS
// ==========================================================================
creditCardElement.addEventListener('click', () => {
    creditCardElement.classList.toggle('flipped');
});

// Toggle Freezing card logic
switchFreeze.addEventListener('change', (e) => {
    const isFrozen = e.target.checked;
    const lastFour = document.getElementById('card-last-four');
    
    if (isFrozen) {
        document.querySelector('.card-front').style.filter = 'grayscale(0.9) opacity(0.7)';
        lastFour.textContent = 'LOCK';
        showToast('Security Alert', 'Credit card frozen. Online/In-store transactions blocked.', true);
    } else {
        document.querySelector('.card-front').style.filter = 'none';
        lastFour.textContent = '4309';
        showToast('Security Alert', 'Card unfrozen. Operations resumed.', false);
    }
});

// Online payment switch trigger
switchOnline.addEventListener('change', (e) => {
    const isOnlineActive = e.target.checked;
    if (!isOnlineActive) {
        showToast('Config Change', 'E-commerce transactions disabled.', false);
    } else {
        showToast('Config Change', 'E-commerce transactions activated.', false);
    }
});

// Daily transaction limit slider handler
limitSlider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    state.limit = val;
    limitBadgeVal.textContent = `$${val.toLocaleString()}`;
});

// ==========================================================================
// NOTIFICATION & TOAST INJECTOR
// ==========================================================================
function showToast(title, body, isUrgent = false) {
    const notification = document.createElement('div');
    notification.className = `app-notification ${isUrgent ? 'fraud' : ''}`;
    notification.innerHTML = `
        <span class="material-symbols-outlined notify-icon">${isUrgent ? 'error' : 'info'}</span>
        <div class="notify-text">
            <span class="notify-title">${escapeHtml(title)}</span>
            <span class="notify-body">${escapeHtml(body)}</span>
        </div>
    `;
    
    // Automatically delete notification after slide out animation completes
    notification.addEventListener('animationend', (e) => {
        if (e.animationName === 'notificationSlideOut') {
            notification.remove();
        }
    });

    notificationTray.appendChild(notification);
}

// Trigger simulated events from Simulator Dashboard
window.triggerAlert = function(alertType) {
    if (alertType === 'low_balance') {
        showToast('Low Balance Notice', 'Your primary savings account is approaching zero.', false);
    } else if (alertType === 'fraud_alert') {
        showToast('Fraud Alert', 'Suspicious activity detected at terminal NY-9482. Tap card screen to review.', true);
    } else if (alertType === 'goal_complete') {
        showToast('Goal Accomplished!', 'Congratulations! You have met your $15,000 Model Y target.', false);
    }
};

// ==========================================================================
// SIMULATOR PANEL CONTROLS AND INTERACTION
// ==========================================================================

// 1. Balance input modifier
simBalanceInput.addEventListener('change', (e) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val) && val >= 0) {
        state.balance = val;
        updateFinancialDashboard();
    }
});

// 2. Savings Goal target modifier
simSavingsTargetInput.addEventListener('change', (e) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val) && val > 0) {
        state.savingsTarget = val;
        updateFinancialDashboard();
    }
});

// 3. Inject transaction trigger
btnAddTx.addEventListener('click', () => {
    const title = txTitleInput.value.trim() || 'Simulated Merchant';
    const amountVal = parseFloat(txAmountInput.value);
    const category = txCategorySelect.value;
    const type = txTypeSelect.value;
    
    if (isNaN(amountVal) || amountVal <= 0) {
        alert('Please enter a positive numeric value for transaction amounts.');
        return;
    }

    const transactionAmount = type === 'debit' ? -amountVal : amountVal;

    // Adjust global balance immediately
    state.balance += transactionAmount;
    if (state.balance < 0) state.balance = 0; // prevent negative balance for display simplicity

    // Generate simulated logs
    const newTx = {
        id: `TXN-${Math.floor(100000 + Math.random() * 900000)}-S`,
        title: title,
        category: category,
        amount: transactionAmount,
        timestamp: 'Just now',
        logo: getCategoryEmoji(category),
        method: type === 'debit' ? 'Axe Visa Card (*4309)' : 'Axe Electronic Deposit',
        status: 'Completed',
        points: Math.max(1, Math.round(amountVal * 0.5))
    };

    // Add to beginning of transaction database
    state.transactions.unshift(newTx);

    // Refresh display dashboards
    updateFinancialDashboard();
    renderTransactions(searchInput.value);

    // Clear inputs
    txTitleInput.value = '';
    txAmountInput.value = '';

    // Play successful notification
    showToast('Transaction Processed', `${newTx.title}: ${transactionAmount < 0 ? '-' : '+'}$${amountVal.toFixed(2)}`, false);
});

// Category Logo helper
function getCategoryEmoji(cat) {
    switch(cat) {
        case 'food': return '☕';
        case 'shopping': return '🎯';
        case 'utilities': return '⚡';
        case 'travel': return '🚗';
        case 'salary': return '💼';
        default: return '💵';
    }
}

// 4. Accent theme color toggle options
colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        colorBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const themeName = btn.getAttribute('data-theme');
        state.theme = themeName;
        
        if (themeName === 'default') {
            document.documentElement.removeAttribute('data-theme-accent');
        } else {
            document.documentElement.setAttribute('data-theme-accent', themeName);
        }
    });
});

// ==========================================================================
// CORE INITIALIZERS
// ==========================================================================

// Toggle hide/show balance
btnToggleBalance.addEventListener('click', () => {
    state.isBalanceHidden = !state.isBalanceHidden;
    updateFinancialDashboard();
});

// Text filtering query
searchInput.addEventListener('input', (e) => {
    renderTransactions(e.target.value);
});

// Bottom sheet closer binds
btnCloseTxDetails.addEventListener('click', closeTransactionDetails);
txDetailsOverlay.addEventListener('click', (e) => {
    if (e.target === txDetailsOverlay) {
        closeTransactionDetails();
    }
});

// Initialize dashboard screen data
updateFinancialDashboard();
renderTransactions();
