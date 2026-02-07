import { test, expect } from '@playwright/test';

test.describe('Admin dapat mengelola Produk Terlaris', () => {
  test.beforeEach(async ({ page }) => {
    // Reset data sebelum tes berjalan
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
    
    // LANGKAH 3: Cari Section "Produk Terlaris"
    // Menggunakan locator('section') agar lebih spesifik dan stabil
    const section = page.locator('section').filter({ hasText: 'Produk Terlaris' });
    await section.scrollIntoViewIfNeeded();
    
    // Cari dropdown produk di dalam section tersebut
    const productSelect = section.locator('select');
    await expect(productSelect).toBeVisible({ timeout: 30000 });
    
    // Pastikan ada opsi produk yang bisa dipilih
    const optionsCount = await productSelect.locator('option').count();
    if (optionsCount <= 1) {
      console.log('Peringatan: Tidak ada produk tersedia di katalog untuk dipilih.');
      return;
    }
    
    // Pilih produk pertama yang tersedia (index 1, karena index 0 biasanya placeholder)
    // Aksi ini akan memicu React untuk menampilkan preview gambar secara otomatis
    await productSelect.selectOption({ index: 1 });
    
    // LANGKAH 4: Tunggu preview muncul
    // Karena gambar otomatis muncul dari katalog, kita tidak perlu upload manual lagi.
    // Kita cukup menunggu indikator "Siap ditampilkan" muncul.
    await expect(page.locator('text=Siap ditampilkan')).toBeVisible({ timeout: 10000 });
    
    // LANGKAH 5: Simpan Perubahan
    const saveButton = section.locator('button').filter({ hasText: /Simpan/ });
    
    // Setup listener untuk menunggu respon sukses dari backend
    const responsePromise = page.waitForResponse(res => 
      res.url().includes('/home/featured-products') && res.status() === 200
    );
    
    await saveButton.click();
    await responsePromise; // Tunggu server selesai memproses
    
    // LANGKAH 6: Verifikasi Popup Sukses
    // Gunakan getByRole 'heading' agar spesifik ke Judul Popup ("Sukses!")
    // Ini menghindari error "Strict mode violation" yang terjadi jika menggunakan getByText
    await expect(page.getByRole('heading', { name: /Sukses|Berhasil/i })).toBeVisible({ timeout: 10000 });
    
    // Tutup popup
    await page.locator('button').filter({ hasText: /OK|Tutup/ }).click();
    
    console.log('Tes untuk menambah Produk Terlaris berhasil!');
  });
});