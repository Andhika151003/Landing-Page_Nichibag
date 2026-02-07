import { test, expect } from '@playwright/test';

test.describe('Admin dapat mengelola Kategori Unggulan', () => {
  test.beforeEach(async ({ page }) => {
    const response = await page.request.post('http://127.0.0.1:5000/home/testing/reset');
    expect(response.ok()).toBeTruthy();
  });

  test('dapat menambah satu item Kategori Unggulan', async ({ page }) => {
    // LANGKAH 1: Navigasi ke Halaman Kelola Home
    await page.goto('/Dashboard');
    await page.getByRole('link', { name: 'Kelola Halaman Utama' }).click();
    await expect(page).toHaveURL(/.*kelola-home/);

    // LANGKAH 2: Fokus pada seksi "Kategori Unggulan" dan siapkan data
    const categorySection = page.locator('section', { hasText: 'Kategori Unggulan' });
    const imagePath = 'fixtures/test-image.png'; // Pastikan gambar ini ada
    const tambahButton = categorySection.getByText('Tambah');
    
    // Pastikan seksi terlihat sebelum interaksi (hindari timeout)
    await expect(categorySection).toBeVisible({ timeout: 30000 });

    // LANGKAH 3: Mengisi semua kolom form
    await expect(categorySection.getByPlaceholder('Nama Kategori')).toBeVisible({ timeout: 30000 });
    await categorySection.getByPlaceholder('Nama Kategori').fill('Kategori Fesyen');
    await categorySection.getByPlaceholder(/Contoh: https:\/\/shopee.co.id/).fill('https://shopee.co.id/kategori-fesyen');
    await categorySection.locator('input[type="file"]').setInputFiles(imagePath);
    
    // LANGKAH 4: Menambah item
    await expect(tambahButton).toBeEnabled();
    const responsePromise = page.waitForResponse('**/home/categories');
    await tambahButton.click();
    await responsePromise;
    
    // LANGKAH 5: Handle Popup dan Verifikasi
    await expect(page.getByText('Data berhasil disimpan.')).toBeVisible({ timeout: 10000 });
    await page.getByRole('button', { name: 'OK' }).click();
    await expect(categorySection.getByText('Kategori Fesyen')).toBeVisible();
    
    console.log('Tes untuk menambah Kategori Unggulan berhasil!');
  });
});