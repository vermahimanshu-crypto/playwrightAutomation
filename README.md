# SauceDemo UI Automation Framework  
Playwright + TypeScript

## Overview

This project is a **Playwright + TypeScript UI automation framework** built specifically for the **SauceDemo** web application.  
It automates core e-commerce flows such as login, product selection, sorting, cart validation, and checkout.

The framework follows best practices like **Page Object Model (POM)**, stable locator strategies, and clean architecture.  
It is scalable, maintainable, and CI-ready.

---

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Playwright Test Runner

---

## Application Under Test

- Application Name: SauceDemo  
- Application Type: Demo e-commerce web application  
- Testing Type: UI Automation Testing  

---

## Project Structure
── playwright.config.ts
├── src
│ ├── pages
│ ├── tests
│ ├── fixtures
│ ├── utils
│ ├── types
│ └── reports
├── README.md



---

## Folder Details

### pages
- Contains Page Object Model classes
- Each page has its own class with locators and reusable methods
- Improves readability and maintainability

### tests
- Contains all SauceDemo UI test scenarios
- Focuses only on test logic and assertions
- Page interactions are handled via page classes

### fixtures
- Contains custom Playwright fixtures
- Handles authenticated state and reusable setup logic
- Avoids duplication across tests

### utils
- Contains reusable helper functions shared across tests

### types
- Contains TypeScript interfaces for structured test data
- Improves type safety and robustness

### reports
- Stores auto-generated Playwright HTML reports

---

## Playwright Configuration

The `playwright.config.ts` file includes:

- Base URL configured using environment variables
- Retries set to 2
- Fully parallel execution enabled
- Chromium browser configuration
- HTML reporter enabled
- CI-ready setup

---

## Automation Design Approach

- Followed Page Object Model (POM)
- Avoided hard waits (`waitForTimeout`)
- Used Playwright built-in auto-waiting and assertions
- Preferred stable locators:
  - getByRole
  - getByLabel
  - getByTestId
- Avoided brittle CSS and XPath selectors

---

## Test Scenarios Covered

### Login
- Valid login scenario
- Invalid login with error message validation

### Product
- Add multiple products to cart
- Validate product names, quantities, and subtotal

### Sorting
- Sort products by price (low to high)
- Verify correct sorting order

### Checkout (Happy Path)
- Navigate to checkout
- Fill required user details
- Validate overview page

### Edge Case
- Remove item from cart
- Verify cart total updates correctly

---

## How to Run Tests

### Install dependencies
```bash
npm install
npx playwright test
npx playwright test --headed

npx playwright show-report
