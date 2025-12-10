import { chromium, FullConfig } from '@playwright/test';
import fs from 'fs';

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;
  
  console.log('Launching Google Chrome for global setup...');
  const browser = await chromium.launch({ channel: 'chrome' });
  
  const page = await browser.newPage();

  console.log(`Navigating to login page at ${baseURL}Admin...`);
  
  // PERBAIKAN: Tambahkan opsi timeout yang lebih panjang dan ubah kondisi tunggu
  // waitUntil: 'domcontentloaded' berarti tes lanjut segera setelah HTML dasar muncul
  try {
    await page.goto(`${baseURL}Admin`, { 
      waitUntil: 'domcontentloaded', 
      timeout: 60000 
    });
  } catch (error) {
    console.error("❌ Gagal memuat halaman login. Pastikan server frontend (npm run dev) sudah berjalan!");
    throw error;
  }

  console.log('Filling login form...');
  // Pastikan elemen input benar-benar ada sebelum diisi
  await page.getByPlaceholder('Username').waitFor({ state: 'visible' });
  await page.getByPlaceholder('Username').fill('admin'); 
  await page.getByPlaceholder('Password').fill('admin123'); 
  await page.getByRole('button', { name: 'Masuk' }).click();

  console.log('Waiting for successful login and navigation...');
  // Tunggu notifikasi sukses muncul lalu hilang
  await page.waitForSelector('text=Login Berhasil 🎉');
  
  // Tunggu URL berubah ke Dashboard (indikator paling akurat login sukses)
  await page.waitForURL('**/Dashboard');
  
  console.log('Login successful. Saving authentication state...');

  // Simpan state (cookies, local storage) ke dalam file
  await page.context().storageState({ path: storageState as string });
  await browser.close();
  console.log('Authentication state saved.');
}

export default globalSetup;