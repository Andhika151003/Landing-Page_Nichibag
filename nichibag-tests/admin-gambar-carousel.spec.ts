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
    
    // LANGKAH 2: Tunggu halaman render dan scroll ke Carousel
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { name: 'Kelola Halaman Utama' })).toBeVisible({ timeout: 30000 });
    
    // LANGKAH 3: Persiapan data
    const imagePath = 'fixtures/test-image.png';
    
    // Scroll ke section Gambar Carousel menggunakan h3 title
    const carouselTitle = page.locator('h3').filter({ hasText: 'Gambar Carousel' });
    await carouselTitle.scrollIntoViewIfNeeded();
    
    // Upload gambar
    await page.locator('input[type="file"]').first().setInputFiles(imagePath);
    
    // Isi link tujuan (placeholder adalah "Contoh: /katalog")
    const linkInput = page.locator('input[type="text"][placeholder*="Contoh"]').first();
    await expect(linkInput).toBeVisible({ timeout: 30000 });
    await linkInput.fill('https://shopee.co.id/link-untuk-carousel');
    
    // LANGKAH 4: Tunggu preview dan simpan
    await expect(page.locator('text=Siap ditampilkan')).toBeVisible({ timeout: 10000 });
    
    // Klik tombol Simpan (pertama)
    const responsePromise = page.waitForResponse('**/home/carousel');
    await page.getByRole('button', { name: /Simpan/ }).first().click();
    await responsePromise;
    
    // Handle Popup
    await expect(page.getByText(/Sukses|berhasil/i)).toBeVisible({ timeout: 10000 });
    await page.locator('button').filter({ hasText: /OK|Tutup/ }).click();

    // LANGKAH 5: Logout
    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page.getByText('Anda akan keluar dari sesi admin.')).toBeVisible();
    await page.getByRole('button', { name: 'Ya, logout!' }).click();
    await expect(page).toHaveURL(/.*Admin/);
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });
});