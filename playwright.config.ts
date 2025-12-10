import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './nichibag-tests',
  
  // --- BAGIAN INI YANG DITAMBAHKAN UNTUK MENGATASI TIMEOUT ---
  // Batas waktu maksimal untuk SATU tes (misal: 60 detik)
  timeout: 60 * 1000, 

  // Batas waktu TOTAL untuk SEMUA tes (misal: 15 menit)
  // Ini penting agar tidak langsung cancel jika tes berjalan lambat di CI
  globalTimeout: 15 * 60 * 1000,

  expect: {
    // Batas waktu untuk assertion (expect) misal: expect(locator).toBeVisible()
    timeout: 10 * 1000,
  },
  // -----------------------------------------------------------

  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  // Jalankan global setup sebelum semua tes
  globalSetup: './global-setup.ts',
 use: {
  // Ganti localhost:5173 menjadi 127.0.0.1:5173
    baseURL: 'http://127.0.0.1:5173/',

    // File tempat menyimpan sesi login
    storageState: '.auth/user.json',

    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    
    // Tambahan: Timeout untuk aksi seperti click/fill
    actionTimeout: 15 * 1000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Google Chrome', 
      use: { 
        ...devices['Desktop Chrome'],
        // UBAH 2: Tambahkan channel 'chrome' untuk menggunakan Google Chrome asli
        channel: 'chrome',}
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },

  /* Run your local dev server before starting the tests */
  webServer: [
    {
      command: 'cd Server && npm start',
      url: 'http://127.0.0.1:5000',
      reuseExistingServer: true, // <--- UBAH INI JADI TRUE
      timeout: 120 * 1000,
    },
    {
      command: 'npm run dev',
      url: 'http://127.0.0.1:5173',
      reuseExistingServer: true, // <--- UBAH INI JADI TRUE JUGA
      timeout: 120 * 1000,
    }
  ],
});