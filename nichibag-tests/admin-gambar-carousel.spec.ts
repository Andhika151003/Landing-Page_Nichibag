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
    
    // LANGKAH 2: Tunggu halaman render
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { name: 'Kelola Halaman Utama' })).toBeVisible({ timeout: 30000 });
    
    // LANGKAH 3: Definisi Section Scope (PENTING)
    // Kita cari section spesifik untuk Carousel
    const section = page.locator('section').filter({ hasText: 'Gambar Carousel' });
    await section.scrollIntoViewIfNeeded();
    
    // Persiapan data
    const imagePath = 'fixtures/test-image.png';
    
    // Upload gambar (Gunakan 'section' bukan 'page')
    await section.locator('input[type="file"]').setInputFiles(imagePath);
    
    // Isi link tujuan (Gunakan 'section' bukan 'page')
    const linkInput = section.locator('input[type="text"][placeholder*="Contoh"]');
    await expect(linkInput).toBeVisible({ timeout: 30000 });
    await linkInput.fill('https://shopee.co.id/link-untuk-carousel');
    
    // LANGKAH 4: Tunggu preview dan simpan
    // PERBAIKAN UTAMA: Cek teks hanya di dalam section ini
    await expect(section.locator('text=Siap ditampilkan')).toBeVisible({ timeout: 10000 });
    
    // Klik tombol Simpan (Gunakan 'section')
    const responsePromise = page.waitForResponse('**/home/carousel');
    await section.locator('button').filter({ hasText: /Simpan/ }).click();
    await responsePromise;
    
    // Handle Popup
    await expect(page.getByRole('heading', { name: /Sukses|Berhasil/i })).toBeVisible({ timeout: 10000 });
    await page.locator('button').filter({ hasText: /OK|Tutup/ }).click();

    // LANGKAH 5: Logout
    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page.getByText('Anda akan keluar dari sesi admin.')).toBeVisible();
    await page.getByRole('button', { name: 'Ya, logout!' }).click();
    await expect(page).toHaveURL(/.*Admin/);
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });
});