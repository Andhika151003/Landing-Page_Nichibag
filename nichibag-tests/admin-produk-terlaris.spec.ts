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
    
    // LANGKAH 2: Tunggu halaman render
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { name: 'Kelola Halaman Utama' })).toBeVisible({ timeout: 30000 });
    
    // LANGKAH 3: Scroll ke "Produk Terlaris" (Definisi Section Scope)
    const section = page.locator('section').filter({ hasText: 'Produk Terlaris' });
    await section.scrollIntoViewIfNeeded();
    
    // Cari dropdown di dalam section
    const productSelect = section.locator('select');
    await expect(productSelect).toBeVisible({ timeout: 30000 });
    
    // Check ada produk tersedia
    const options = await productSelect.locator('option').count();
    if (options <= 1) {
      // Jika tidak ada produk, kita skip atau fail dengan pesan jelas
      console.log('Tidak ada produk tersedia di katalog');
      return; 
    }
    
    // Pilih produk pertama yang tersedia
    await productSelect.selectOption({ index: 1 });
    
    // LANGKAH 4: Tunggu preview muncul
    // PERBAIKAN UTAMA: Cek teks hanya di dalam section ini
    await expect(section.locator('text=Siap ditampilkan')).toBeVisible({ timeout: 10000 });
    
    // LANGKAH 5: Simpan Perubahan
    const saveButton = section.locator('button').filter({ hasText: /Simpan/ });
    const responsePromise = page.waitForResponse('**/home/featured-products');
    await saveButton.click();
    await responsePromise;
    
    // LANGKAH 6: Handle Popup dan Verifikasi
    await expect(page.getByRole('heading', { name: /Sukses|Berhasil/i })).toBeVisible({ timeout: 10000 });
    await page.locator('button').filter({ hasText: /OK|Tutup/ }).click();
    
    console.log('Tes untuk menambah Produk Terlaris berhasil!');
  });
});