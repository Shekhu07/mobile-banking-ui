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
    cardDesign: 'axe-black',
    budgets: {
        food: 1000,
        shopping: 1200,
        travel: 400
    },
    activeWallet: 'checking',
    wallets: {
        checking: {
            name: 'Checking Account',
            balance: 12450.80,
            accNum: '•••• 8421',
            status: 'Primary',
            trendClass: 'text-success',
            trendIcon: 'trending_up'
        },
        savings: {
            name: 'Savings Target',
            balance: 8500.00,
            accNum: 'Goal: $15,000',
            status: '56% Reached',
            trendClass: 'text-primary',
            trendIcon: 'savings'
        },
        investments: {
            name: 'Investment Portfolio',
            balance: 24300.00,
            accNum: 'Equity & Bonds',
            status: '+12.4%',
            trendClass: 'text-success',
            trendIcon: 'arrow_drop_up'
        },
        crypto: {
            name: 'Crypto Wallet',
            balance: 4850.50,
            accNum: 'BTC & ETH',
            status: '-2.5%',
            trendClass: 'text-danger',
            trendIcon: 'arrow_drop_down'
        }
    },
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
            points: 6,
            wallet: 'checking'
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
            points: 70,
            wallet: 'checking'
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
            points: 150,
            wallet: 'checking'
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
            points: 45,
            wallet: 'checking'
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
            points: 0,
            wallet: 'checking'
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
            points: 12,
            wallet: 'checking'
        },
        {
            id: 'TXN-492049-M',
            title: 'Coinbase Buy BTC',
            category: 'shopping',
            amount: -250.00,
            timestamp: 'May 12, 11:20 AM',
            logo: '🪙',
            method: 'Crypto Wallet',
            status: 'Completed',
            points: 125,
            wallet: 'crypto'
        },
        {
            id: 'TXN-739281-W',
            title: 'Dividend (Vanguard S&P 500)',
            category: 'salary',
            amount: 45.00,
            timestamp: 'May 10, 09:30 AM',
            logo: '📈',
            method: 'Brokerage Settlement',
            status: 'Completed',
            points: 22,
            wallet: 'investments'
        },
        {
            id: 'TXN-182931-S',
            title: 'Weekly Automated Deposit',
            category: 'salary',
            amount: 50.00,
            timestamp: 'May 08, 08:00 AM',
            logo: '🐷',
            method: 'Axe Checking Link',
            status: 'Completed',
            points: 10,
            wallet: 'savings'
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

// Transfer Modal Elements
const transferMoneyOverlay = document.getElementById('transfer-money-overlay');
const btnCloseTransfer = document.getElementById('btn-close-transfer');
const btnConfirmTransfer = document.getElementById('btn-confirm-transfer');
const btnCloseSuccess = document.getElementById('btn-close-success');
const transferAmountVal = document.getElementById('transfer-amount-val');
const transferStep1 = document.getElementById('transfer-step-1');
const transferStepProcessing = document.getElementById('transfer-step-processing');
const transferStepSuccess = document.getElementById('transfer-step-success');
const transferSuccessMsg = document.getElementById('transfer-success-msg');
const receiptRecipient = document.getElementById('receipt-recipient');
const receiptAmount = document.getElementById('receipt-amount');
const receiptTxId = document.getElementById('receipt-txid');
const contactCards = document.querySelectorAll('.contact-card');
const keypadBtns = document.querySelectorAll('.custom-keypad .key-btn');

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
    // Sync balance values in the carousel UI elements
    Object.keys(state.wallets).forEach(wKey => {
        const balEl = document.querySelector(`.wallet-card[data-wallet="${wKey}"] .wallet-balance-amount`);
        if (balEl) {
            balEl.textContent = formatCurrency(state.wallets[wKey].balance);
        }
    });

    const activeW = state.wallets[state.activeWallet];

    // 1. Balance Display
    if (state.isBalanceHidden) {
        mainBalanceEl.textContent = '••••••';
        balanceEyeIcon.textContent = 'visibility_off';
    } else {
        mainBalanceEl.textContent = formatCurrency(activeW.balance);
        balanceEyeIcon.textContent = 'visibility';
    }

    // 2. Income/Expense Totals from transaction history of ACTIVE wallet
    let totalIncome = 0;
    let totalExpenses = 0;
    
    state.transactions.forEach(tx => {
        if (tx.wallet === state.activeWallet) {
            if (tx.amount > 0) {
                totalIncome += tx.amount;
            } else {
                totalExpenses += Math.abs(tx.amount);
            }
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
    const currentSavings = state.wallets.savings.balance;
    const pct = Math.min(Math.round((currentSavings / target) * 100), 100);
    savingsProgressText.textContent = `${pct}%`;
    // circle radius r=15.9155 has circumference of exactly 100, stroke-dasharray pattern is stroke, gap
    savingsProgressRing.setAttribute('stroke-dasharray', `${pct}, 100`);

    // Update savings percentage text in wallet card footer
    const savingsTrendText = document.querySelector('.wallet-card[data-wallet="savings"] .wallet-trend');
    if (savingsTrendText) {
        savingsTrendText.innerHTML = `<span class="material-symbols-outlined icon-inline" style="font-size: 14px;">savings</span> ${pct}% Reached`;
    }

    // 4. Update Spending Doughnut chart breakdown
    updateSpendingBreakdownChart(totalExpenses);

    // 5. Update UI values in the Simulator inputs if they are not active
    if (document.activeElement !== simBalanceInput) {
        simBalanceInput.value = activeW.balance.toFixed(2);
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
        if (tx.wallet === state.activeWallet && tx.amount < 0 && categories[tx.category] !== undefined) {
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
    const caps = state.budgets;

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
        const matchesWallet = tx.wallet === state.activeWallet;
        const matchesQuery = tx.title.toLowerCase().includes(q) || tx.category.toLowerCase().includes(q);
        return matchesWallet && matchesQuery;
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
    if (action === 'send') {
        openTransferModal();
    } else if (action === 'scan' || action === 'bills' || action === 'vault') {
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
// FEATURE 2: TRANSFER MODAL STATE & FUNCTIONS
// ==========================================================================
let transferState = {
    recipient: 'Alice Smith',
    amountStr: '0.00'
};

function openTransferModal() {
    transferState.recipient = 'Alice Smith';
    transferState.amountStr = '0.00';
    transferAmountVal.textContent = '0.00';
    
    // Reset contact UI selection
    contactCards.forEach((c, idx) => {
        if (idx === 0) c.classList.add('active');
        else c.classList.remove('active');
    });
    
    // Reset steps UI visibility
    transferStep1.style.display = 'block';
    transferStepProcessing.style.display = 'none';
    transferStepSuccess.style.display = 'none';
    
    // Open sheet
    transferMoneyOverlay.classList.add('active');
    transferMoneyOverlay.setAttribute('aria-hidden', 'false');
}

function closeTransferModal() {
    transferMoneyOverlay.classList.remove('active');
    transferMoneyOverlay.setAttribute('aria-hidden', 'true');
}

// Contact selection
contactCards.forEach(card => {
    card.addEventListener('click', () => {
        contactCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        transferState.recipient = card.getAttribute('data-contact');
    });
});

// Keypad handler
keypadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-val');
        let current = transferState.amountStr;
        
        if (val === 'backspace') {
            if (current.length > 0) {
                current = current.slice(0, -1);
            }
            if (current === '' || current === '-') {
                current = '0.00';
            }
        } else if (val === '.') {
            if (!current.includes('.')) {
                if (current === '0.00' || current === '') {
                    current = '0.';
                } else {
                    current += '.';
                }
            }
        } else {
            // Number pressed
            if (current === '0.00') {
                current = val;
            } else {
                // Limit to two decimal places
                const dotIdx = current.indexOf('.');
                if (dotIdx === -1 || current.length - dotIdx <= 2) {
                    current += val;
                }
            }
        }
        
        transferState.amountStr = current;
        transferAmountVal.textContent = current;
    });
});

// Confirm transfer (processing -> success)
btnConfirmTransfer.addEventListener('click', () => {
    const amt = parseFloat(transferState.amountStr);
    if (isNaN(amt) || amt <= 0) {
        alert('Please enter a valid amount to send.');
        return;
    }
    
    // Wallet switcher checks balance dynamically
    let currentBalance = state.balance;
    if (state.activeWallet && state.wallets) {
        currentBalance = state.wallets[state.activeWallet].balance;
    }
    
    if (amt > currentBalance) {
        showToast('Insufficient Funds', `You cannot send $${amt.toFixed(2)}: exceeds available balance.`, true);
        return;
    }
    
    if (amt > state.limit) {
        showToast('Limit Exceeded', `Your daily transaction limit is set to $${state.limit.toLocaleString()}.`, true);
        return;
    }
    
    // Hide inputs, show spinner
    transferStep1.style.display = 'none';
    transferStepProcessing.style.display = 'block';
    
    // Simulate transaction processing delay
    setTimeout(() => {
        // Subtract from active wallet balance or global balance
        if (state.activeWallet && state.wallets) {
            state.wallets[state.activeWallet].balance -= amt;
            // Sync global balance representation
            state.balance = state.wallets[state.activeWallet].balance;
        } else {
            state.balance -= amt;
        }
        
        // Generate Transaction ID
        const txId = `TXN-${Math.floor(100000 + Math.random() * 900000)}-S`;
        
        // Add new debit transaction
        const newTx = {
            id: txId,
            title: `To ${transferState.recipient}`,
            category: 'travel',
            amount: -amt,
            timestamp: 'Just now',
            logo: '💸',
            method: 'Axe Checking Account',
            status: 'Completed',
            points: Math.round(amt * 0.1), // 10% points
            wallet: state.activeWallet || 'checking'
        };
        
        state.transactions.unshift(newTx);
        
        // Refresh Dashboard
        updateFinancialDashboard();
        renderTransactions(searchInput.value);
        
        // Update success receipts
        transferSuccessMsg.textContent = `Sent $${formatCurrency(amt)} to ${transferState.recipient}`;
        receiptRecipient.textContent = transferState.recipient;
        receiptAmount.textContent = `$${formatCurrency(amt)}`;
        receiptTxId.textContent = txId;
        
        // Toggle steps
        transferStepProcessing.style.display = 'none';
        transferStepSuccess.style.display = 'block';
        
        showToast('Transfer Completed', `Successfully sent $${amt.toFixed(2)} to ${transferState.recipient}`, false);
        
        // Trigger Budget Cap Warning check (stubbed for Feature 3)
        if (typeof checkBudgetExceededAlerts === 'function') {
            checkBudgetExceededAlerts('travel', amt);
        }
    }, 1500);
});

// Close buttons
btnCloseTransfer.addEventListener('click', closeTransferModal);
btnCloseSuccess.addEventListener('click', closeTransferModal);
transferMoneyOverlay.addEventListener('click', (e) => {
    if (e.target === transferMoneyOverlay) {
        closeTransferModal();
    }
});

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
        state.wallets[state.activeWallet].balance = val;
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

    // Adjust active wallet balance immediately
    state.wallets[state.activeWallet].balance += transactionAmount;
    if (state.wallets[state.activeWallet].balance < 0) state.wallets[state.activeWallet].balance = 0;
    state.balance = state.wallets[state.activeWallet].balance;

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
        points: Math.max(1, Math.round(amountVal * 0.5)),
        wallet: state.activeWallet
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

    // Trigger Budget Cap Warning check if expense
    if (type === 'debit') {
        checkBudgetExceededAlerts(category, amountVal);
    }
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

// 5. Card design visual switcher
const cardDesignBtns = document.querySelectorAll('.card-design-btn');
const cardFrontElement = document.querySelector('.card-side.card-front');

cardDesignBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        cardDesignBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const designName = btn.getAttribute('data-card-design');
        state.cardDesign = designName;
        
        // Remove existing design classes
        cardFrontElement.classList.remove('axe-black', 'axe-gold', 'midnight-carbon', 'emerald-jade', 'holographic-glass');
        // Add new design class
        cardFrontElement.classList.add(designName);
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

// ==========================================================================
// FEATURE 3: DYNAMIC BUDGET INTERACTIONS
// ==========================================================================
const simBudgetFoodInput = document.getElementById('sim-budget-food');
const simBudgetShoppingInput = document.getElementById('sim-budget-shopping');
const simBudgetTravelInput = document.getElementById('sim-budget-travel');

simBudgetFoodInput.addEventListener('change', (e) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val) && val >= 0) {
        state.budgets.food = val;
        updateFinancialDashboard();
        checkBudgetExceededAlerts('food', 0);
    }
});
simBudgetShoppingInput.addEventListener('change', (e) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val) && val >= 0) {
        state.budgets.shopping = val;
        updateFinancialDashboard();
        checkBudgetExceededAlerts('shopping', 0);
    }
});
simBudgetTravelInput.addEventListener('change', (e) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val) && val >= 0) {
        state.budgets.travel = val;
        updateFinancialDashboard();
        checkBudgetExceededAlerts('travel', 0);
    }
});

function checkBudgetExceededAlerts(category, addedAmount) {
    if (!state.budgets[category]) return;
    
    // Calculate spent
    let totalSpent = 0;
    state.transactions.forEach(tx => {
        if (tx.amount < 0 && tx.category === category) {
            totalSpent += Math.abs(tx.amount);
        }
    });
    
    const cap = state.budgets[category];
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
    
    if (totalSpent >= cap) {
        showToast(
            'Budget Cap Exceeded', 
            `Danger! Spent $${totalSpent.toFixed(2)} of $${cap.toFixed(2)} in ${categoryName}.`, 
            true
        );
    } else if (totalSpent >= cap * 0.8) {
        showToast(
            'Budget Alert Warning', 
            `Warning: ${categoryName} budget is at ${Math.round((totalSpent / cap) * 100)}% capacity.`, 
            false
        );
    }
}

// Wallet Switcher click listeners
const walletCards = document.querySelectorAll('.wallet-card');
walletCards.forEach(card => {
    card.addEventListener('click', () => {
        walletCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        
        state.activeWallet = card.getAttribute('data-wallet');
        state.balance = state.wallets[state.activeWallet].balance;
        
        updateFinancialDashboard();
        renderTransactions(searchInput.value);
    });
});

// ==========================================================================
// FEATURE 5: INTERACTIVE CHART & PROJECTIONS
// ==========================================================================
const chartColTriggers = document.querySelectorAll('.chart-col-trigger');
const chartTooltipEl = document.getElementById('chart-tooltip-el');
const chartFocusLine = document.getElementById('chart-focus-line');
const chartFocusDot = document.getElementById('chart-focus-dot');
const togglePrediction = document.getElementById('toggle-prediction');
const predictionLinePath = document.getElementById('prediction-line-path');

togglePrediction.addEventListener('change', (e) => {
    if (e.target.checked) {
        predictionLinePath.style.display = 'block';
        showToast('AI insights loaded', 'Dashed purple line projects expected spending based on current cashflow velocity.', false);
    } else {
        predictionLinePath.style.display = 'none';
    }
});

chartColTriggers.forEach(col => {
    col.addEventListener('mouseenter', (e) => {
        const day = col.getAttribute('data-day');
        const x = parseFloat(col.getAttribute('data-x'));
        const y = parseFloat(col.getAttribute('data-y'));
        
        // Calculate dynamic spent amount
        const spent = getDailySpend(state.activeWallet, day);
        
        // Update Tooltip DOM
        chartTooltipEl.querySelector('.tooltip-day').textContent = day;
        chartTooltipEl.querySelector('.tooltip-amount').textContent = `$${spent.toFixed(2)}`;
        
        // Show tooltip
        chartTooltipEl.style.display = 'flex';
        // Wait a microtask to add active class for smooth animation transition
        setTimeout(() => {
            chartTooltipEl.classList.add('active');
        }, 10);
        
        // Map SVG coordinates to HTML container coordinates
        const container = col.closest('.svg-graph-container');
        const containerRect = container.getBoundingClientRect();
        
        // Convert viewBox coordinates (320x180) to client coordinates
        const clientX = (x / 320) * containerRect.width;
        const clientY = (y / 180) * containerRect.height;
        
        chartTooltipEl.style.left = `${clientX}px`;
        chartTooltipEl.style.top = `${clientY - 10}px`;
        
        // Show focus indicators
        chartFocusLine.setAttribute('x1', x);
        chartFocusLine.setAttribute('x2', x);
        chartFocusLine.style.display = 'block';
        
        chartFocusDot.setAttribute('cx', x);
        chartFocusDot.setAttribute('cy', y);
        chartFocusDot.style.display = 'block';
    });
    
    col.addEventListener('mouseleave', () => {
        chartTooltipEl.classList.remove('active');
        setTimeout(() => {
            if (!chartTooltipEl.classList.contains('active')) {
                chartTooltipEl.style.display = 'none';
            }
        }, 150);
        
        chartFocusLine.style.display = 'none';
        chartFocusDot.style.display = 'none';
    });
});

function getDailySpend(walletId, dayName) {
    const baseValues = {
        checking: { Monday: 140.00, Tuesday: 85.50, Wednesday: 115.00, Thursday: 50.25, Friday: 135.80, Saturday: 35.00, Sunday: 65.40 },
        savings: { Monday: 0.00, Tuesday: 0.00, Wednesday: 0.00, Thursday: 0.00, Friday: 0.00, Saturday: 0.00, Sunday: 50.00 },
        investments: { Monday: 0.00, Tuesday: 0.00, Wednesday: 0.00, Thursday: 0.00, Friday: 0.00, Saturday: 0.00, Sunday: 0.00 },
        crypto: { Monday: 250.00, Tuesday: 0.00, Wednesday: 0.00, Thursday: 0.00, Friday: 0.00, Saturday: 0.00, Sunday: 0.00 }
    };
    
    let base = baseValues[walletId]?.[dayName] || 0.00;
    
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayName = daysOfWeek[new Date().getDay()];
    
    if (dayName === currentDayName) {
        state.transactions.forEach(tx => {
            if (tx.wallet === walletId && tx.amount < 0 && tx.timestamp === 'Just now') {
                base += Math.abs(tx.amount);
            }
        });
    }
    
    return base;
}

// Initialize dashboard screen data
updateFinancialDashboard();
renderTransactions();
