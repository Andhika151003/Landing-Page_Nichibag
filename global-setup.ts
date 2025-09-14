import { chromium, FullConfig } from '@playwright/test';
import fs from 'fs';

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log(`Navigating to login page at ${baseURL}Admin...`);
  await page.goto(`${baseURL}Admin`);

  console.log('Filling login form...');
  await page.getByPlaceholder('Username').fill('admin'); // Ganti jika username beda
  await page.getByPlaceholder('Password').fill('admin123'); // Ganti jika password beda
  await page.getByRole('button', { name: 'Masuk' }).click();

  console.log('Waiting for successful login and navigation...');
  // Tunggu notifikasi sukses muncul lalu hilang
  await page.waitForSelector('text=Login Berhasil 🎉');
  await page.waitForSelector('text=Login Berhasil 🎉', { state: 'hidden' });
  
  // Tunggu sampai URL adalah Dashboard
  await page.waitForURL('**/Dashboard');
  console.log('Login successful. Saving authentication state...');

  // Simpan state (cookies, local storage) ke dalam file
  await page.context().storageState({ path: storageState as string });
  await browser.close();
  console.log('Authentication state saved.');
}

export default globalSetup;