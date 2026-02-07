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
    
    // LANGKAH 2: Tunggu halaman selesai render
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { name: 'Kelola Halaman Utama' })).toBeVisible({ timeout: 30000 });
    
    // LANGKAH 3: Scroll ke section Kategori Unggulan dan pilih dari dropdown
    const imagePath = 'fixtures/test-image.png';
    
    // Scroll ke heading "Kategori Unggulan"
    const categoryTitle = page.locator('h3').filter({ hasText: 'Kategori Unggulan' });
    await categoryTitle.scrollIntoViewIfNeeded();
    
    // Cari dropdown untuk kategori (ada di section Kategori Unggulan)
    // Waituntil dropdown terlihat
    const section = page.locator('h3').filter({ hasText: 'Kategori Unggulan' }).locator('..');
    const categorySelect = section.locator('select').first();
    await expect(categorySelect).toBeVisible({ timeout: 30000 });
    
    // Harus ada kategori tersedia (option count > 1: skip placeholder)
    const options = await categorySelect.locator('option').count();
    
    if (options <= 1) {
      throw new Error('Tidak ada kategori tersedia - pastikan produk di katalog memiliki field "category"');
    }
    
    // Pilih kategori pertama yang tersedia
    await categorySelect.selectOption({ index: 1 });
    
    // LANGKAH 4: Upload gambar dan tunggu preview
    const fileInput = section.locator('input[type="file"]').first();
    await fileInput.setInputFiles(imagePath);
    
    // Tunggu preview "Siap ditampilkan" muncul
    await expect(page.locator('text=Siap ditampilkan')).toBeVisible({ timeout: 10000 });
    
    // LANGKAH 5: Klik tombol Simpan
    const saveButton = section.locator('button').filter({ hasText: /Simpan/ }).first();
    const responsePromise = page.waitForResponse('**/home/categories');
    await saveButton.click();
    await responsePromise;
    
    // LANGKAH 6: Handle Popup
    await expect(page.getByText(/Sukses|berhasil/i)).toBeVisible({ timeout: 10000 });
    await page.locator('button').filter({ hasText: /OK|Tutup/ }).click();
    
    console.log('Tes untuk menambah Kategori Unggulan berhasil!');
  });
});