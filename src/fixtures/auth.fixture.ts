// src/fixtures/auth.fixture.ts
import { test as base, expect, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

// 🔑 STEP 1: Define fixture type
type AuthFixtures = {
  loggedInPage: Page;
};

// 🔑 STEP 2: Pass type to base.extend<>
export const test = base.extend<AuthFixtures>({
  loggedInPage: async ({ page }, use) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login(
      process.env.VALID_USER!,
      process.env.VALID_PASSWORD!
    );


    await use(page);
  },
});

export { expect };
