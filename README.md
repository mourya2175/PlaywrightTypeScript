# Playwright Page Object Model (POM) Framework

A comprehensive Playwright automation framework using the Page Object Model pattern for testing [SauceDemo](https://www.saucedemo.com/) application.

## Table of Contents
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Running Tests](#running-tests)
- [Configuration](#configuration)
- [Test Reports](#test-reports)

## Project Structure

```
AutomationFramework/
├── src/
│   ├── pages/               # Page Object Model classes
│   │   ├── LoginPage.ts
│   │   ├── InventoryPage.ts
│   │   ├── CartPage.ts
│   │   ├── CheckoutPage.ts
│   │   └── HeaderPage.ts
│   └── tests/
│       ├── e2e/             # End-to-end tests
│       │   ├── e2e-001-login.spec.ts
│       │   ├── e2e-002-cart.spec.ts
│       │   └── e2e-003-checkout.spec.ts
│       └── smoke/           # Smoke tests
│           └── smoke-001-login.spec.ts
├── playwright-report/       # Generated HTML reports (auto-opened)
├── test-results/           # Test results and videos
├── playwright.config.ts    # Playwright configuration
├── package.json            # Project dependencies
└── README.md               # This file
```

## Setup Instructions

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation Steps

1. **Navigate to project directory:**
```bash
cd d:\PlaywrightProjects\AutomationFramework
```

2. **Install dependencies:**
```bash
npm install
```

Playwright browsers will be automatically installed during the first test run or via:
```bash
npx playwright install
```

## Running Tests

### Execute All Tests
```bash
npm test
```

This command runs all tests (both E2E and smoke tests) in headed mode with video recording and auto-opens the HTML report.

### Execute Single Test Script
```bash
npx playwright test src/tests/e2e/e2e-001-login.spec.ts
```

Example outputs:
```bash
# Run specific E2E test file
npx playwright test src/tests/e2e/e2e-001-login.spec.ts

# Run specific smoke test file
npx playwright test src/tests/smoke/smoke-001-login.spec.ts
```

### Execute All Tests in a Folder

#### Run all E2E tests:
```bash
npm run test:e2e
```

Or:
```bash
npx playwright test src/tests/e2e
```

#### Run all smoke tests:
```bash
npm run test:smoke
```

Or:
```bash
npx playwright test src/tests/smoke
```

### Execute Tests with Retry Logic and Multiple Workers

#### Run with retry logic (2 retries) and multiple workers:
```bash
npx playwright test --retries=2 --workers=4
```

#### Run with specific configuration:
```bash
# Run specific folder with 3 workers and 3 retries
npx playwright test src/tests/e2e --workers=3 --retries=3

# Run with specific browser
npx playwright test --project=chromium

# Run with headed mode explicitly
npx playwright test --headed
```

### Additional Test Commands

#### Debug mode (interactive test debugging):
```bash
npm run test:debug
```

#### UI mode (interactive test UI):
```bash
npm run test:ui
```

#### Headed mode (see browser during execution):
```bash
npm run test:headed
```

## Configuration

### Headed/Headless Mode

The framework is configured to run in **headed mode** by default. To modify this behavior:

Edit [playwright.config.ts](playwright.config.ts) and change the `headless` property:

```typescript
// In the projects section, change headless value:
projects: [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'], headless: false },  // Set to true for headless mode
  },
  // ... other browsers
]
```

**Headless mode (background execution):**
```typescript
headless: true  // Browser runs in background
```

**Headed mode (visible browser window):**
```typescript
headless: false  // Browser window is visible
```

### Video Recording

Video recording is **enabled by default** for all tests. Videos are saved in the `test-results` folder.

To disable video recording, edit [playwright.config.ts](playwright.config.ts):

```typescript
use: {
  baseURL: 'https://www.saucedemo.com/',
  trace: 'on-first-retry',
  video: 'off',  // Change from 'on' to 'off' to disable
}
```

Video options:
- `'on'` - Record all tests
- `'off'` - Disable recording
- `'retain-on-failure'` - Record only failed tests

### HTML Report

An **HTML report is automatically generated and opened** after each test run, regardless of pass or fail status.

- Reports are saved in: `playwright-report/` folder
- Automatically opens in the default browser after tests complete
- Contains detailed test results, screenshots, and traces

To disable auto-opening:
```typescript
reporter: [
  ['html', { outputFolder: 'playwright-report', open: 'never' }],  // Change 'always' to 'never'
]
```

## Test Reports

### Viewing Reports Manually

If you need to view reports again:
```bash
npx playwright show-report
```

### Report Contents
- Test execution summary
- Individual test results
- Screenshots for failed tests
- Video recordings
- Trace information for debugging

## Test Credentials

Use these credentials to test the application:

| Username | Password | Status |
|----------|----------|--------|
| standard_user | secret_sauce | ✅ Active |
| locked_out_user | secret_sauce | 🔒 Locked |
| problem_user | secret_sauce | ⚠️ Problem User |
| performance_glitch_user | secret_sauce | 🐌 Slow |

## Framework Features

### Page Object Model
- **LoginPage**: Login and authentication
- **InventoryPage**: Product listing and cart operations
- **CartPage**: Shopping cart management
- **CheckoutPage**: Checkout process
- **HeaderPage**: Header and navigation

### Test Coverage
- **E2E Tests (10 tests)**: Complete user workflows
  - Login validation
  - Cart management
  - Checkout process
  
- **Smoke Tests (5 tests)**: Critical functionality checks
  - Login functionality
  - Inventory display
  - Basic cart operations

### Built-in Features
- ✅ Headed mode execution
- ✅ Video recording for all tests
- ✅ Automatic HTML report generation
- ✅ Cross-browser testing (Chromium, Firefox, WebKit)
- ✅ Trace recording for debugging
- ✅ Automatic report opening

## Troubleshooting

### Tests not running
```bash
# Reinstall browsers
npx playwright install

# Clear cache
npx playwright clean
```

### Report not opening automatically
Check that your default browser is configured in your OS settings.

### Video files missing
Ensure the `test-results` directory has write permissions.

## Best Practices

1. **Keep Page Objects simple**: Each page object represents one page/component
2. **Use descriptive test names**: Test names should clearly describe what is being tested
3. **Avoid hard-coded waits**: Use Playwright's built-in waiting mechanisms
4. **Review test reports**: Always check HTML reports for failures and debugging information
5. **Organize tests logically**: Group related tests in the same spec file

## Contributing

When adding new tests:
1. Create page objects for new pages under `src/pages/`
2. Add test files under `src/tests/e2e/` or `src/tests/smoke/`
3. Follow the naming convention: `<test-type>-<number>-<description>.spec.ts`
4. Use existing page objects to interact with the application

## License

ISC
