import { test, expect } from '@playwright/test';

test.describe('Admin dapat mengelola Produk Terlaris', () => {
  test.beforeEach(async ({ page }) => {
    const response = await page.request.post('http://127.0.0.1:5000/home/testing/reset');
    expect(response.ok()).toBeTruthy();
  });

  test('dapat menambah satu item Produk Terlaris', async ({ page }) => {
    
    // LANGKAH 1: Navigasi ke Halaman Kelola Home
    await page.goto('/Dashboard');
    await page.getByRole('link', { name: 'Kelola Halaman Utama' }).click();
    await expect(page).toHaveURL(/.*kelola-home/);

    // LANGKAH 2: Fokus pada seksi "Produk Terlaris" dan siapkan data
    const productSection = page.locator('section', { hasText: 'Produk Terlaris' });
    const imagePath = 'fixtures/test-image.png'; // Pastikan gambar ini ada
    const tambahButton = productSection.getByText('Tambah');
    
    // Pastikan seksi terlihat sebelum interaksi
    await expect(productSection).toBeVisible({ timeout: 30000 });

    // LANGKAH 3: Mengisi semua kolom form
    await expect(productSection.getByPlaceholder('Nama Produk')).toBeVisible({ timeout: 30000 });
    await productSection.getByPlaceholder('Nama Produk').fill('Tas Kanvas Premium');
    await productSection.getByPlaceholder(/Contoh: https:\/\/shopee.co.id/).fill('https://shopee.co.id/tas-kanvas-premium');
    await productSection.getByPlaceholder('Contoh: 50000').fill('125000');
    await productSection.getByPlaceholder('Contoh: 15').fill('10');
    await productSection.locator('input[type="file"]').setInputFiles(imagePath);
    
    // LANGKAH 4: Menambah item
    await expect(tambahButton).toBeEnabled();
    const responsePromise = page.waitForResponse('**/home/featured-products');
    await tambahButton.click();
    await responsePromise;
    
    // LANGKAH 5: Handle Popup dan Verifikasi
    await expect(page.getByText('Data berhasil disimpan.')).toBeVisible({ timeout: 10000 });
    await page.getByRole('button', { name: 'OK' }).click();
    await expect(productSection.getByText('Tas Kanvas Premium')).toBeVisible();
    
    console.log('Tes untuk menambah Produk Terlaris berhasil!');
  });
});