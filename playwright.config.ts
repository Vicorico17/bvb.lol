import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  use: { baseURL: 'http://127.0.0.1:3000', browserName: 'chromium', channel: 'chrome', screenshot: 'only-on-failure' },
  webServer: { command: process.env.BVB_TEST_PRODUCTION ? 'npm run start -- --hostname 127.0.0.1' : 'npm run dev -- --hostname 127.0.0.1', url: 'http://127.0.0.1:3000', reuseExistingServer: !process.env.CI },
});
