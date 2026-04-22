# COVID-19 Tracker Automation Framework

A professional-grade test automation framework built with **Playwright** and **TypeScript** to validate data integrity on the Inerg COVID-19 Tracker dashboard.

---

## 🚀 Overview
This framework demonstrates advanced automation techniques, including handling complex SVG charts, dynamic data scraping, and cross-component data validation (UI Cards vs. Line Charts).

### Key Features
* **Page Object Model (POM):** Clean separation between page interactions and test logic.
* **Dynamic Data Testing:** Automatically scrapes available states from the UI and selects a random candidate for each test run to ensure broad coverage.
* **SVG Data Extraction:** Custom logic to interact with Plotly-based SVG elements, utilizing `textContent` and `hover` dispatch events to bypass standard DOM limitations.
* **Data Normalization:** A transformation layer that synchronizes different data formats (e.g., converting "397218" to "397.218k") for strict assertion.
* **Robust Synchronization:** Custom `CommonUtils` layer to ensure elements are both attached and visible before interaction.
* **Environment Management:** Uses `dotenv` and `cross-env` for environment-specific URL switching.

---

## 🛠️ Tech Stack
* **Language:** TypeScript
* **Tool:** Playwright (Test Runner)
* **Architecture:** Page Object Model
* **Dependencies:** `dotenv`, `cross-env`

---

## 📋 Prerequisites
* **Node.js:** v16 or higher
* **npm:** Installed with Node

---

## ⚙️ Installation & Setup

1. **Step 1: Clone the repository**
   ```bash
   https://github.com/anchanababu/inerg-automation-task.git
   
Step 2: Install dependencies

Bash
npm install

Step 3: Configure Environment Variables
Ensure a .env file exists in the root directory with the following content:

Code snippet
URL_TEST=[https://inerg-test.web.app/](https://inerg-test.web.app/)

🏃 Running Tests
The framework uses cross-env to handle environment variables across different operating systems.

Run the specific State-Chart Validation test:
Bash
npm run test -- src/tests/state-chart-data.spec.ts

Run all tests in Headed mode:
Bash
npm run test -- --headed

Generate and View Report:
Bash
npx playwright show-report

📁 Project Structure
Plaintext

├── src/
│   ├── pages/            # Page Object Models
│   │   ├── dashboard-page.ts
│   │   └── results-page.ts
│   ├── tests/            # Test specifications
│   │   └── state-chart-data.spec.ts
│   └── utils/            # Shared utility functions
│       └── commonutils.ts
├── .env                  # Environment variables
├── playwright.config.ts  # Playwright global configuration
└── package.json          # Project dependencies and scripts

🧪 Validation Logic Detail
The framework performs a "Self-Consistency" check:
Dynamic Discovery: It scrapes the dropdown to find all available states.
Randomized Selection: It selects a random state to ensure the locators work across varying data sets.
Data Extraction: It extracts values from the Summary Cards and the Interactive Line Chart (via SVG hovers).
Normalization: It formats raw card numbers (e.g., 397218) into chart-compatible strings (e.g., 397.218k).
Strict Assertion: It compares both data sources to ensure the dashboard remains a "Single Source of Truth."
