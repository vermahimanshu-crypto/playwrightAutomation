import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";

let login: LoginPage;
test.beforeEach(async ({ page }) => {
  login = new LoginPage(page);
  await login.goto();
});

test("Valid user can login", async ({ page }) => {
  await login.login(
    process.env.VALID_USER!,
    process.env.VALID_PASSWORD!
  );
  await expect(page).toHaveURL(/inventory/);
});

test("Invalid login shows error", async ({ page }) => {
  await login.login(
    process.env.INVALID_USER!,
    process.env.INVALID_PASSWORD!
  );
  await login.assertLoginFailed();
});
