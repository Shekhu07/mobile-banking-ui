# Axe Bank - Premium Mobile Banking Simulator

A beautiful, high-fidelity, and fully interactive mobile banking simulation dashboard designed under Material Design 3 specifications. This application features a dual-panel desktop simulator frame: a **Control Panel** sidebar on the left and a **Mobile Phone Frame Mockup** on the right.

---

## 🚀 Interactive Features

### 1. 💳 Premium Card Customization
* **Real-time Styling**: Instantly swap physical debit/credit card designs using the Control Panel (themes include *Axe Black*, *Axe Gold*, *Midnight Carbon*, *Emerald Jade*, and *Holographic Glass*).
* **3D Rotation**: Tap the card inside the **Cards** tab to flip it and reveal the CVV, signature strip, and legal disclosure.

### 2. 💸 Interactive Send Money Workflow
* **Keypad bottom sheet**: Click **Send** on the Home screen to trigger a step-by-step transfer sheet modal.
* **Flow**:
  1. Select from a scrollable mock contacts list.
  2. Use the custom custom keypad to input an amount.
  3. Undergo a simulated security check (verification spinner).
  4. Display a receipt summary and inject the transaction into the logs.

### 3. 🎯 Adjustable Budget Caps & Alerts
* **Dynamic Budget Limits**: Modify Food, Shopping, and Travel limits in the sidebar control panel.
* **Breach Alerts**: Exceeding warning (80%) or danger (100%) limits immediately triggers customized toast notifications.

### 4. 🔄 Multi-Account Switcher Carousel
* **Swipeable Cards**: Horizontal carousel cards on the Home page representing **Checking**, **Savings**, **Investments**, and **Crypto** accounts.
* **Pivoted Logs**: Swiping or clicking a card shifts the balance views, income/expense summaries, spending category breakdowns, and transaction history cards contextually.

### 5. 📈 Interactive Analytics Hover Tooltips
* **Graph Tooltips**: Hover or tap points on the Analytics page's SVG line chart to view detailed popovers mapping precise spending coordinates.
* **AI Projection**: Toggle the **AI Projection** checkbox to render expected future spending lines.

---

## 🛠️ Technology Stack

* **Structure**: HTML5 (Semantic Layout)
* **Styling**: Vanilla CSS3 (Custom Properties, CSS Grid/Flexbox, Glassmorphism, animations)
* **Logic**: Vanilla ES6 JavaScript (State pipelines, DOM interactions, SVG calculations)
* **Assets**: Google Fonts (*Plus Jakarta Sans* & *Inter*), Material Symbols Outlined Icons

---

## 💻 Running Locally

Since this is a client-side static web application, no compilation or database installation is required:

1. Clone or download the repository files.
2. Serve the directory using any local web server (e.g. Python):
   ```bash
   python3 -m http.server 8000
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```
