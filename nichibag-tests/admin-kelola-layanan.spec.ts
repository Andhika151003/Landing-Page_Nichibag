import { test, expect } from '@playwright/test';

test.describe('Admin dapat mengelola Halaman Layanan', () => {

  test.beforeEach(async ({ page }) => {
    // Pastikan port backend benar (5000)
    const response = await page.request.post('http://127.0.0.1:5000/api/service/testing/reset');
    expect(response.ok()).toBeTruthy();
  });

  test('dapat mengedit dan menyimpan kartu layanan pertama', async ({ page }) => {
    // LANGKAH 1: Navigasi ke Services page
    await page.goto('/Dashboard');
    await page.waitForLoadState('networkidle');
    
    // Coba mencari link navigasi
    const serviceLink = page.getByRole('link').filter({ hasText: /Service|Layanan/ });
    if (await serviceLink.count() > 0) {
      await serviceLink.first().click();
    } else {
      await page.goto('/kelola-services');
    }
    
    await expect(page).toHaveURL(/.*services/);
    await page.waitForLoadState('networkidle');
    
    // LANGKAH 2: Cari dan edit kartu pertama
    // Selector ini mencari div yang punya class border dan text Kartu/#1/0
    const firstCard = page.locator('[class*="border"]').filter({ hasText: /Kartu|#1|0/ }).first();
    await expect(firstCard).toBeVisible({ timeout: 30000 });
    
    const imagePath = 'fixtures/test-image.png';
    const newTitle = 'Layanan Uji Coba Kualitas';
    // Hapus kata 'berhasil' agar tidak trigger false positive di text locator
    const newDescription = 'Deskripsi ini diisi oleh tes otomatis Playwright.'; 
    
    // LANGKAH 3: Mengisi form
    
    // Upload gambar (jika input tersedia)
    const fileInputs = firstCard.locator('input[type="file"]');
    if (await fileInputs.count() > 0) {
      await fileInputs.first().setInputFiles(imagePath);
      // Tunggu sebentar untuk upload/preview process
      await page.waitForTimeout(1000); 
    }
    
    // Isi Judul
    const textInputs = firstCard.locator('input[type="text"]');
    if (await textInputs.count() > 0) {
      await textInputs.first().fill(newTitle);
    }
    
    // Isi Deskripsi
    const textareas = firstCard.locator('textarea');
    if (await textareas.count() > 0) {
      await textareas.first().fill(newDescription);
    }
    
    // LANGKAH 4: Menyimpan perubahan
    // Cari tombol simpan di halaman (biasanya di pojok kanan atas)
    const saveButton = page.getByRole('button').filter({ hasText: /Simpan|Perbarui/ }).first();
    
    // Setup listener response sebelum klik
    const responsePromise = page.waitForResponse(res => 
      res.url().includes('/api/service') && res.status() === 200
    );
    
    await saveButton.click();
    await responsePromise; // Tunggu response backend sukses
    
    // LANGKAH 5: Verifikasi (PERBAIKAN UTAMA DISINI)
    // Gunakan getByRole 'heading' agar spesifik ke Judul Popup saja
    // Ini menghindari konflik dengan teks body popup
    await expect(page.getByRole('heading', { name: /Sukses|Berhasil/i })).toBeVisible({ timeout: 10000 });
    
    // Tutup popup
    await page.locator('button').filter({ hasText: /OK|Tutup/ }).click();

    console.log('Tes untuk mengedit kartu layanan berhasil!');
  });
});