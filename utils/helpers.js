module.exports = {
    async loginAndNavigateToHome(loginPage, username, password) {
      await loginPage.navigate();
      await loginPage.login(username, password);
    },
  };
  