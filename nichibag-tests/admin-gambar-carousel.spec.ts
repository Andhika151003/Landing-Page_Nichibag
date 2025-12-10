import { test, expect } from '@playwright/test';

test.describe('Admin dapat Gambar Carousel di Halaman Utama', () => {

  test.beforeEach(async ({ page }) => {
    const response = await page.request.post('http://127.0.0.1:5000/home/testing/reset');
    expect(response.ok()).toBeTruthy();
  });

  test('dapat menambah satu item carousel dan kemudian logout', async ({ page }) => {
    
    // LANGKAH 1: Navigasi
    await page.goto('/Dashboard');
    await page.getByRole('link', { name: 'Kelola Halaman Utama' }).click();
    await expect(page).toHaveURL(/.*kelola-home/);

    // LANGKAH 2: Menambah Item Carousel
    const carouselSection = page.locator('section', { hasText: 'Gambar Carousel' });
    const imagePath = 'fixtures/test-image.png';
    const tambahButton = carouselSection.getByText('Tambah');
    await carouselSection.locator('input[type="file"]').setInputFiles(imagePath);
    await carouselSection.getByPlaceholder(/Contoh: https:\/\/shopee.co.id/).fill('https://shopee.co.id/link-untuk-carousel');
    await expect(tambahButton).toBeEnabled();
    const responsePromise = page.waitForResponse('**/home/carousel');
    await tambahButton.click();
    await responsePromise;
    
    // LANGKAH 3: Handle Popup
    await expect(page.getByText('Data berhasil disimpan.')).toBeVisible({ timeout: 10000 });
    await page.getByRole('button', { name: 'OK' }).click();

    // LANGKAH 4: Logout
    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page.getByText('Anda akan keluar dari sesi admin.')).toBeVisible();
    await page.getByRole('button', { name: 'Ya, logout!' }).click();
    await expect(page).toHaveURL(/.*Admin/);
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });
});