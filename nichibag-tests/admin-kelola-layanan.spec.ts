import { test, expect } from '@playwright/test';

test.describe('Admin dapat mengelola Halaman Layanan', () => {

  test.beforeEach(async ({ page }) => {
    const response = await page.request.post('http://127.0.0.1:5000/api/service/testing/reset');
    expect(response.ok()).toBeTruthy();
  });

  test('dapat mengedit dan menyimpan kartu layanan pertama', async ({ page }) => {
    
    // LANGKAH 1: Navigasi
    await page.goto('/Dashboard');
    await page.getByRole('link', { name: 'Kelola Services' }).click();
    await expect(page).toHaveURL(/.*kelola-services/);
    await expect(page.getByRole('heading', { name: 'Kelola Halaman Layanan' })).toBeVisible();

    // LANGKAH 2: Targetkan kartu dan siapkan data
    const firstCard = page.locator('.border', { hasText: 'Kartu Layanan #1' });
    const imagePath = 'fixtures/test-image.png';
    const newTitle = 'Layanan Uji Coba Kualitas';
    const newDescription = 'Deskripsi ini berhasil diisi oleh tes otomatis.';
    
    // LANGKAH 3: Mengisi form
    const uploadResponsePromise = page.waitForResponse('**/api/upload');
    await firstCard.locator('input[type="file"]').setInputFiles(imagePath);
    const uploadResponse = await uploadResponsePromise;
    expect(uploadResponse.ok()).toBeTruthy();
    await firstCard.locator('input[type="text"]').fill(newTitle);
    await firstCard.locator('textarea').fill(newDescription);

    // LANGKAH 4: Menyimpan semua perubahan
    const saveResponsePromise = page.waitForResponse('**/api/service');
    await page.getByRole('button', { name: 'Simpan Perubahan' }).click();
    await saveResponsePromise;
    
    // LANGKAH 5: Handle Popup dan Verifikasi
    await expect(page.getByText('Data halaman layanan berhasil diperbarui.')).toBeVisible();
    await page.getByRole('button', { name: 'OK' }).click();
    await expect(firstCard.locator('input[type="text"]')).toHaveValue(newTitle);
    await expect(firstCard.locator('textarea')).toHaveValue(newDescription);

    console.log('Tes untuk mengedit kartu layanan berhasil!');
  });
});