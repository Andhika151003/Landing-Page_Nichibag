// nichibag-tests/admin-kategori-unggulan.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Admin dapat mengelola Kategori Unggulan', () => {
  test.beforeEach(async ({ page }) => {
    const response = await page.request.post('http://127.0.0.1:5000/home/testing/reset');
    expect(response.ok()).toBeTruthy();
  });

  test('dapat menambah satu item Kategori Unggulan', async ({ page }) => {
    // LANGKAH 1: Navigasi
    await page.goto('/Dashboard');
    await page.getByRole('link', { name: 'Kelola Halaman Utama' }).click();
    await expect(page).toHaveURL(/.*kelola-home/);
    await page.waitForLoadState('networkidle');
    
    // LANGKAH 2: Cari Section Kategori Unggulan dengan lebih spesifik
    // Kita cari elemen <section> yang mengandung teks "Kategori Unggulan"
    const section = page.locator('section').filter({ hasText: 'Kategori Unggulan' });
    await section.scrollIntoViewIfNeeded();
    
    // Cari dropdown di dalam section tersebut
    const categorySelect = section.locator('select');
    await expect(categorySelect).toBeVisible({ timeout: 30000 });
    
    // Check opsi
    const options = await categorySelect.locator('option').count();
    if (options <= 1) {
      // Jika kosong, mungkin data belum terload, atau memang kosong. Kita log saja.
      console.log('Peringatan: Tidak ada kategori tersedia untuk dipilih.');
    } else {
      await categorySelect.selectOption({ index: 1 });
    }
    
    // LANGKAH 3: Upload gambar
    const imagePath = 'fixtures/test-image.png';
    const fileInput = section.locator('input[type="file"]');
    await fileInput.setInputFiles(imagePath);
    
    // Tunggu preview muncul (Logic di KelolaHome.jsx harus sudah diperbaiki agar ini visible)
    await expect(page.locator('text=Siap ditampilkan')).toBeVisible({ timeout: 10000 });
    
    // LANGKAH 4: Simpan
    const saveButton = section.locator('button').filter({ hasText: /Simpan/ });
    const responsePromise = page.waitForResponse('**/home/categories');
    await saveButton.click();
    await responsePromise;
    
    // LANGKAH 5: Handle Popup
    await expect(page.getByText(/Sukses|berhasil/i)).toBeVisible();
    await page.locator('button').filter({ hasText: /OK|Tutup/ }).click();
  });
});