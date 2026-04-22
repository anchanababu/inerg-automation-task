````md
# COVID-19 Tracker Automation Framework

A professional-grade test automation framework built with **Playwright** and **TypeScript** to validate data integrity on the Inerg COVID-19 Tracker dashboard.

---

## 🚀 Overview

This framework demonstrates advanced automation techniques, including:

- Handling complex SVG charts  
- Dynamic data scraping  
- Cross-component data validation (**UI Cards vs Line Charts**)  
- Robust synchronization for stable automation execution  

---

## ✨ Key Features

### 📌 Architecture & Design
- **Page Object Model (POM)**  
  Clean separation between page interactions and test logic.

- **Reusable Utilities Layer**  
  Shared helper methods for synchronization and common actions.

---

### 📌 Advanced Testing Logic
- **Dynamic Data Testing**  
  Automatically scrapes available states from the UI and selects a random candidate during each test run for wider coverage.

- **Cross-Validation Testing**  
  Compares dashboard summary cards with chart data to ensure consistency.

---

### 📌 SVG / Chart Handling
- **SVG Data Extraction**  
  Custom logic to interact with Plotly-based SVG elements using:

  - `textContent`
  - `hover` dispatch events

  This bypasses standard DOM limitations.

---

### 📌 Data Transformation
- **Data Normalization Layer**  
  Synchronizes values between different formats.

Example:

| Raw Value | Normalized |
|----------|------------|
| 397218   | 397.218k   |

Used for strict assertions.

---

### 📌 Environment Management
- Uses:

  - `dotenv`
  - `cross-env`

For environment-specific URL switching.

---

## 🛠️ Tech Stack

| Category | Technology |
|--------|------------|
| Language | TypeScript |
| Framework | Playwright |
| Runner | Playwright Test |
| Pattern | Page Object Model |
| Packages | dotenv, cross-env |

---

## 📋 Prerequisites

- **Node.js** v16 or higher  
- **npm** installed with Node.js

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/anchanababu/inerg-automation-task.git
cd inerg-automation-task
````

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root folder:

```env
URL_TEST=https://inerg-test.web.app/
```

---

## 🏃 Running Tests

### Run Specific Test

```bash
npm run test -- src/tests/state-chart-data.spec.ts
```

### Run All Tests (Headed Mode)

```bash
npm run test -- --headed
```

### Open Playwright Report

```bash
npx playwright show-report
```

---

## 📁 Project Structure

```plaintext
├── src/
│   ├── pages/
│   │   ├── dashboard-page.ts
│   │   └── results-page.ts
│
│   ├── tests/
│   │   └── state-chart-data.spec.ts
│
│   └── utils/
│       └── commonutils.ts
│
├── .env
├── playwright.config.ts
└── package.json
```

---

## 🧪 Validation Logic Detail

This framework performs a **Self-Consistency Check**.

### Step 1: Dynamic Discovery

Scrapes the dropdown and identifies all available states.

### Step 2: Randomized Selection

Selects a random state during execution.

### Step 3: Data Extraction

Collects values from:

* Summary Cards
* Interactive SVG Line Chart (hover extraction)

### Step 4: Data Normalization

Converts card values into chart-compatible format.

Example:

```text
397218 → 397.218k
```

### Step 5: Strict Assertion

Compares both sources to verify:

✅ Accurate Data
✅ UI Integrity
✅ Single Source of Truth

---

## 🎯 Why This Framework Stands Out

* Real-world automation design
* Handles non-standard SVG charts
* Strong data validation approach
* Scalable Page Object architecture
* Production-ready Playwright setup

---


