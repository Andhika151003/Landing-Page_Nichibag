// tests/landing-page.spec.ts
import { test, expect } from '@playwright/test';

// -- Tes 1: Verifikasi Halaman Utama --
test('halaman utama (Home) terload dengan benar dan menampilkan judul', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  const pageTitle = page.getByRole('heading', { name: 'Produk Terlaris yang Wajib Dimiliki' });
  await expect(pageTitle).toBeVisible();
});


// -- Tes 2: Verifikasi Navigasi ke Halaman About --
test('dapat menavigasi ke halaman About dan menampilkan kontennya', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('navigation').getByRole('link', { name: 'About' }).click();
  await page.waitForURL('**/about');
  // PERBAIKAN: Tambahkan `exact: true` dan `level: 1` untuk locator yang paling spesifik
  const aboutPageHeading = page.getByRole('heading', { 
    name: 'NICHIBAG.ID', 
    exact: true, 
    level: 1 
  });
  
  await expect(aboutPageHeading).toBeVisible();
});


// -- Tes 3: Verifikasi Navigasi ke Halaman Service --
test('dapat menavigasi ke halaman Service dan menampilkan kontennya', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('navigation').getByRole('link', { name: 'Service' }).click();
  await page.waitForURL('**/services');
  const servicePageHeading = page.getByRole('heading', { name: 'Layanan Kami' });
  await expect(servicePageHeading).toBeVisible();
});


// -- Tes 4: Verifikasi Navigasi ke Halaman Contact Us --
test('dapat menavigasi ke halaman Contact Us dan menampilkan kontennya', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('navigation').getByRole('link', { name: 'Contact Us' }).click();
  await page.waitForURL('**/contact');
  // PERBAIKAN: Cari parent unik (#contact) dulu, baru cari heading di dalamnya
  const contactPageHeading = page.locator('#contact').getByRole('heading', { name: 'Hubungi Kami' });
  await expect(contactPageHeading).toBeVisible();
});