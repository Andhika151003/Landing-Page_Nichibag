import { test, expect } from '@playwright/test';

test.describe('Admin dapat mengelola Halaman About', () => {

  test.beforeEach(async ({ page }) => {
    const response = await page.request.post('http://localhost:5000/api/about/testing/reset');
    expect(response.ok()).toBeTruthy();
  });

  test('dapat mengupload gambar baru untuk bagian "Siapa Kami"', async ({ page }) => {
    
    // LANGKAH 1: Navigasi
    await page.goto('/Dashboard');
    await page.getByRole('link', { name: 'Kelola About' }).click();
    await expect(page).toHaveURL(/.*kelola-about/);
    await expect(page.getByRole('heading', { name: 'Kelola Halaman About' })).toBeVisible();

    // LANGKAH 2: Upload gambar baru
    const imagePath = 'fixtures/test-image.png';
    const uploadResponsePromise = page.waitForResponse('**/api/upload');
    await page.locator('input[type="file"]').setInputFiles(imagePath);
    const uploadResponse = await uploadResponsePromise;
    expect(uploadResponse.ok()).toBeTruthy();
    await expect(page.locator('img[alt="Preview"]')).toBeVisible();

    // LANGKAH 3: Menyimpan perubahan
    const saveResponsePromise = page.waitForResponse('**/api/about');
    
    await page.getByRole('button', { name: 'Simpan Perubahan' }).click();
    
    await saveResponsePromise;
    
    // LANGKAH 4: Handle Popup dan Verifikasi Akhir
    await expect(page.getByText('Data halaman About berhasil disimpan.')).toBeVisible();
    await page.getByRole('button', { name: 'OK' }).click();

    await page.reload();
    await expect(page.locator('img[alt="Preview"]')).toHaveAttribute('src', /.*uploads/);

    console.log('Tes untuk mengedit Halaman About berhasil!');
  });
});