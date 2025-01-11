# **Playwright Automation Framework**

This project demonstrates an automation framework for testing the Ducati Scrambler website using Playwright and the Page Object Model (POM) design pattern.

---

## **Table of Contents**

1. [Prerequisites](#prerequisites)
   - [Install Node.js](#1-install-nodejs)
   - [Install Visual Studio Code (VS Code)](#2-install-visual-studio-code-vs-code)
   - [Install Playwright Locally](#3-install-playwright-locally)

2. [Test Scenarios](#test-scenarios)
3. [How to Run Tests](#how-to-run-tests)
4. [Project Structure](#project-structure)
5. [Key Features](#key-features)
6. [Future Improvements](#future-improvements)

---

## **Prerequisites**

Ensure the following software is installed on your machine before proceeding:

### **1. Install Node.js**

Node.js is required to manage the dependencies for this project.

- **Download Node.js**: [Node.js Official Website](https://nodejs.org/)
- Install Node.js by downloading the LTS version suitable for your operating system.
- Verify installation:
  ```bash
  node -v
  npm -v

### **2. Install Visual Studio Code (VS Code)
VS Code is recommended for editing and running the automation scripts.

Download VS Code: VS Code Official Website(https://code.visualstudio.com/)
Install VS Code and open the project folder in the editor.
Install the Playwright Test for VS Code extension for easier debugging and test execution.

### **3. Install Playwright Locally
- Initialize the project:This creates a package.json file.
  ```bash
  npm init -y
- Install Playwright:This will add Playwright to your devDependencies in package.json.
  ```bash
  npm install playwright --save-dev
- Install required browsers:This ensures that Chromium, Firefox, and WebKit browsers are installed for testing.
  ```bash
  npx playwright install

## **Test Scenarios**
The framework covers the following test scenarios:

### **Homepage Navigation**

Given I am on the Ducati Scrambler website.
When I click “Start to Create”.
Then I should see the “Create Your Custom Scrambler Ducati” page.

### **Image Generation**

Given I am on the image creation page.
When I fill in the prompt and click “Generate”.
Then I should see the 4 generated images.

### **Image Selection and Verification**

Given the 4 images have been generated.
When I fill in my details and accept the terms.
And I click “Submit”.
Then I should be able to choose one of the 4 images.


## **How to Run Tests**
- Run All Tests
  ```bash
  npx playwright test
- Run a Specific Test File
  ```bash
  npx playwright test ./tests/<test-file-name>.spec.js
- Run Tests in Headed Mode
  ```bash
  npx playwright test --headed
- View HTML Test Report
  ```bash
  npx playwright show-report

## **HProject Structure**
project/
├── node_modules/        # Project dependencies
├── pages/               # Page Object Model classes (HomePage.js, CreateImagesPage.js)
├── tests/               # Test files (homepageTests.spec.js, createImagesPageTests.spec.js)
├── utils/               # Utility files (formUtils.js, imageUtils.js)
├── test-data/           # Test data (e.g., userDetails.json)
├── playwright.config.js # Playwright configuration
├── package.json         # Node.js dependencies and scripts
└── README.md            # Project documentation

## **Key Features**

### **Page Object Model (POM):**
      Reusable classes for managing page interactions.
### **Utility Functions :**
      Common reusable utilities for form filling, image validation, etc.
### **Page Object Model (POM):**
      Separate test files for better organization.  
### **Base Configuration::**
        Centralized Playwright configuration for URL

## **Future Improvements**

### **Environment Configurations:**
      Support different environments (e.g., staging, production).
### **Integration with CI/CD:** 
      Run tests automatically using CI/CD pipelines.
### **Visual Regression Testing:** 
      Add tools like Percy or Playwright's visual testing capabilities.
