// nichibag-tests/admin-produk-terlaris.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Admin dapat mengelola Produk Terlaris', () => {
  test.beforeEach(async ({ page }) => {
    const response = await page.request.post('http://127.0.0.1:5000/home/testing/reset');
    expect(response.ok()).toBeTruthy();
  });

  test('dapat menambah satu item Produk Terlaris', async ({ page }) => {
    await page.goto('/Dashboard');
    await page.getByRole('link', { name: 'Kelola Halaman Utama' }).click();
    await expect(page).toHaveURL(/.*kelola-home/);
    await page.waitForLoadState('networkidle');
    
    // PERBAIKAN: Gunakan selector section wrapper
    const section = page.locator('section').filter({ hasText: 'Produk Terlaris' });
    await section.scrollIntoViewIfNeeded();
    
    const productSelect = section.locator('select');
    await expect(productSelect).toBeVisible({ timeout: 30000 });
    
    // Pilih produk
    const options = await productSelect.locator('option').count();
    if (options > 1) {
       await productSelect.selectOption({ index: 1 });
    }
    
    // Upload gambar (walaupun otomatis, kadang user bisa upload manual/replace di UI anda)
    // Di logic KelolaHome Anda, jika pilih produk, gambar otomatis muncul. 
    // Jadi kita tidak perlu upload manual KECUALI logika Anda mengharuskannya.
    // Jika upload manual tetap ada:
    const fileInput = section.locator('input[type="file"]');
    if (await fileInput.isVisible()) {
        const imagePath = 'fixtures/test-image.png';
        await fileInput.setInputFiles(imagePath);
    }

    // Tunggu preview
    await expect(page.locator('text=Siap ditampilkan')).toBeVisible({ timeout: 10000 });
    
    // Simpan
    const saveButton = section.locator('button').filter({ hasText: /Simpan/ });
    const responsePromise = page.waitForResponse('**/home/featured-products');
    await saveButton.click();
    await responsePromise;
    
    await expect(page.getByText(/Sukses|berhasil/i)).toBeVisible();
    await page.locator('button').filter({ hasText: /OK|Tutup/ }).click();
  });
});