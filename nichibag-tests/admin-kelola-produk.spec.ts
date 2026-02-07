import { test, expect } from '@playwright/test';

test.describe('Admin dapat mengelola Produk', () => {

  test.beforeEach(async ({ page }) => {
  // Ubah menjadi 127.0.0.1
  const response = await page.request.post('http://127.0.0.1:5000/products/testing/reset');
  expect(response.ok()).toBeTruthy();
});

  test('dapat menambah produk baru dengan satu varian warna', async ({ page }) => {
    // LANGKAH 1: Navigasi
    await page.goto('/Dashboard');
    await page.getByRole('link', { name: 'Kelola Produk' }).click();
    await expect(page).toHaveURL(/.*kelola.*Produk/i);
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { name: /Kelola.*Produk/ })).toBeVisible({ timeout: 30000 });

    // LANGKAH 2: Buka form tambah produk
    await page.getByRole('button', { name: /Tambah.*Produk/ }).click();
    await expect(page.getByRole('heading', { name: /Tambah.*Produk/ })).toBeVisible({ timeout: 30000 });

    // LANGKAH 3: Isi form produk
    // Tunggu semua field terlihat sebelum diisi
    await page.waitForLoadState('networkidle');
    
    // Isi field dasar (gunakan selector alternatif jika label tidak ditemukan)
    const nameInput = page.locator('input[placeholder*="Nama"], label:has-text("Nama Produk") ~ input, input[name*="nama"]').first();
    await nameInput.fill('Produk Uji Coba Playwright');
    
    const codeInput = page.locator('input[placeholder*="Kode"], label:has-text("Kode Produk") ~ input, input[name*="kode"]').first();
    await codeInput.fill('PW-TEST-001');
    
    // Untuk kategori, cari select atau dropdown
    const categorySelect = page.locator('select[name*="kategori"], select[name*="category"], select').first();
    if (await categorySelect.count() > 0) {
      const options = await categorySelect.locator('option').count();
      if (options > 1) {
        // Pilih option pertama yang tersedia (skip placeholder)
        await categorySelect.selectOption({ index: 1 });
      }
    }
    
    const priceInput = page.locator('input[name="price"]');
    await priceInput.fill('75000');
    
    const discountInput = page.locator('input[name="discountPercentage"]');
    await discountInput.fill('15');
    
    const descInput = page.locator('textarea[name="description"]');
    await descInput.fill('Ini adalah deskripsi produk testing.');
    
    // Isi spesifikasi jika ada
    const materialInput = page.locator('input[name="material"]');
    await materialInput.fill('Kertas Kraft');
    
    const weightInput = page.locator('input[name="weight"]');
    await weightInput.fill('50');
    
    // LANGKAH 4: Menambah varian warna
    const colorInput = page.locator('input[placeholder*="Warna"], input[placeholder*="Color"]').first();
    const imagePath = 'fixtures/test-image.png';
    
    if (await colorInput.count() > 0) {
      await colorInput.fill('Merah Maroon');
      
      const fileInput = page.locator('input[type="file"][multiple], input[type="file"]').last();
      if (await fileInput.count() > 0) {
        await fileInput.setInputFiles(imagePath);
      }
      
      const addColorBtn = page.getByRole('button').filter({ hasText: /Tambah.*Varian|Add.*Variant/ }).first();
      if (await addColorBtn.count() > 0) {
        await addColorBtn.click();
        await expect(page.getByText('Merah Maroon')).toBeVisible({ timeout: 10000 });
      }
    }
    
    // LANGKAH 5: Menyimpan produk
    const saveButton = page.getByRole('button').filter({ hasText: /Simpan|Save/ }).first();
    const responsePromise = page.waitForResponse(/.*products.*/, { timeout: 30000 }).catch(() => null);
    await saveButton.click();
    // Wait for response atau timeout after 5 sec
    await page.waitForTimeout(5000);
    
    // LANGKAH 6: Verifikasi sukses
    await expect(page.getByText(/Sukses|berhasil|Produk.*disimpan/i)).toBeVisible({ timeout: 10000 });
    const okBtn = page.locator('button').filter({ hasText: /OK|Tutup/ }).first();
    if (await okBtn.count() > 0) {
      await okBtn.click();
    }

    console.log('Tes untuk menambah Produk baru berhasil!');
  });
});