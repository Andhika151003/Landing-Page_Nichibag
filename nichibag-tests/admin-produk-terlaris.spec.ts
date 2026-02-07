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
    
    // LANGKAH 3: Scroll ke "Produk Terlaris" dan pilih produk dari dropdown
    const productTitle = page.locator('h3').filter({ hasText: 'Produk Terlaris' });
    await productTitle.scrollIntoViewIfNeeded();
    
    // Cari section Produk Terlaris
    const section = productTitle.locator('..');
    const productSelect = section.locator('select').first();
    await expect(productSelect).toBeVisible({ timeout: 30000 });
    
    // Check ada produk tersedia (option count > 1)
    const options = await productSelect.locator('option').count();
    if (options <= 1) {
      throw new Error('Tidak ada produk tersedia di katalog');
    }
    
    // Pilih produk pertama yang tersedia
    await productSelect.selectOption({ index: 1 });
    
    // LANGKAH 4: Upload gambar
    const imagePath = 'fixtures/test-image.png';
    const fileInput = section.locator('input[type="file"]').first();
    await fileInput.setInputFiles(imagePath);
    
    // LANGKAH 5: Tunggu preview dan simpan
    await expect(page.locator('text=Siap ditampilkan')).toBeVisible({ timeout: 10000 });
    
    // Klik tombol Simpan
    const saveButton = section.locator('button').filter({ hasText: /Simpan/ }).first();
    const responsePromise = page.waitForResponse('**/home/featured-products');
    await saveButton.click();
    await responsePromise;
    
    // LANGKAH 6: Handle Popup dan Verifikasi
    await expect(page.getByText(/Sukses|berhasil/i)).toBeVisible({ timeout: 10000 });
    await page.locator('button').filter({ hasText: /OK|Tutup/ }).click();
    
    console.log('Tes untuk menambah Produk Terlaris berhasil!');
  });
});