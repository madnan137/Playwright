const { expect } = require('@playwright/test');

class LoginPage {
    constructor(page) {
      this.page = page;
      this.usernameInput = page.locator('#user-name');
      this.passwordInput = page.locator('#password');
      this.loginButton = page.locator('#login-button');
    }
  
    async navigate() {
      await this.page.goto('/');
    }
  
    async login(username, password) {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
    }
  }
  
  module.exports = LoginPage
  