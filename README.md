# Project Title
yet another playwright practice - attempt2

## Description
This project contains automated end-to-end tests for the test application using Playwright.

## Prerequisites
Before you begin, ensure you have met the following requirements:
- Node.js (v16+ recommended)
- npm (version 8.0 or higher)
- Playwright
  - to install Playwright use:
  ```bash
  npm install
  npx playwright install
  ```

## Setup

```bash
  https://github.com/anastasia-ivanova/yet-another-js-course-v2-practice.git
```

## Running Tests

- All tests: `npx playwright test`

- Specific test: `npx playwright test tests/example.spec.ts`

- Headed mode: `npx playwright test --headed`

- Debug mode: `npx playwright test --debug`

- Specific browser: `npx playwright test --project=chromium`

View the HTML report (after test run): 
```bash
npx playwright show-report
```