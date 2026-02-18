import dotenv from "dotenv";
dotenv.config();

import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  retries: process.env.CI ? 2 : 0,
  // fullyParallel: true,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ["html", { outputFolder: "reports", open: "always" }]
  ],

  use: {
    baseURL: process.env.BASE_URL,
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "Chromium",
      use: { browserName: "chromium" },
    },
    // {
    //   name: "Firefox",
    //   use: { browserName: "firefox" },
    // },
  ],
});
