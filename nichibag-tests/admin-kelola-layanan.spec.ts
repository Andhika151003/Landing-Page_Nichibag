import { test, expect } from '@playwright/test';

test.describe('Admin dapat mengelola Halaman Layanan', () => {

  test.beforeEach(async ({ page }) => {
    const response = await page.request.post('http://127.0.0.1:5000/api/service/testing/reset');
    expect(response.ok()).toBeTruthy();
  });

  test('dapat mengedit dan menyimpan kartu layanan pertama', async ({ page }) => {
    // LANGKAH 1: Navigasi ke Services page
    // Coba akses langsung atau melalui link di dashboard
    await page.goto('/Dashboard');
    await page.waitForLoadState('networkidle');
    
    // Coba mencari link dengan berbagai variasi teks
    let serviceLink = page.getByRole('link').filter({ hasText: /Service|Layanan/ });
    const linkCount = await serviceLink.count();
    
    if (linkCount > 0) {
      // Jika ada link Services/Layanan, klik
      await serviceLink.first().click();
    } else {
      // Jika tidak ada, navigasi langsung ke URL
      await page.goto('/kelola-services');
    }
    
    // Tunggu halaman layanan load
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*services/);
    
    // LANGKAH 2: Cari dan edit kartu pertama
    const firstCard = page.locator('[class*="border"]').filter({ hasText: /Kartu|#1|0/ }).first();
    await expect(firstCard).toBeVisible({ timeout: 30000 });
    
    const imagePath = 'fixtures/test-image.png';
    const newTitle = 'Layanan Uji Coba Kualitas';
    const newDescription = 'Deskripsi ini berhasil diisi oleh tes otomatis.';
    
    // LANGKAH 3: Mengisi form
    // Upload gambar
    const fileInputs = firstCard.locator('input[type="file"]');
    if (await fileInputs.count() > 0) {
      await fileInputs.first().setInputFiles(imagePath);
      await page.waitForLoadState('networkidle');
    }
    
    // Isi title dan description
    const textInputs = firstCard.locator('input[type="text"]');
    if (await textInputs.count() > 0) {
      await textInputs.first().clear();
      await textInputs.first().fill(newTitle);
    }
    
    const textareas = firstCard.locator('textarea');
    if (await textareas.count() > 0) {
      await textareas.first().clear();
      await textareas.first().fill(newDescription);
    }
    
    // LANGKAH 4: Menyimpan perubahan
    const saveButton = page.getByRole('button').filter({ hasText: /Simpan|Perbarui/ }).first();
    if (await saveButton.count() > 0) {
      const saveResponsePromise = page.waitForResponse(/.*service|.*update/);
      await saveButton.click();
      try {
        await saveResponsePromise;
      } catch {
        // Response might not match pattern, continue
      }
    }
    
    // LANGKAH 5: Verifikasi
    await expect(page.getByText(/Sukses|berhasil|diperbarui/i)).toBeVisible({ timeout: 10000 });
    await page.locator('button').filter({ hasText: /OK|Tutup/ }).click();

    console.log('Tes untuk mengedit kartu layanan berhasil!');
  });
});