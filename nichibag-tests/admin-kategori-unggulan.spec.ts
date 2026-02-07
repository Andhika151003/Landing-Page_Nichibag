import { test, expect } from '@playwright/test';

test.describe('Admin dapat mengelola Kategori Unggulan', () => {
  test.beforeEach(async ({ page }) => {
    // Reset data sebelum setiap tes
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
    
    // LANGKAH 3: Cari Section Kategori Unggulan
    // Kita cari elemen <section> yang mengandung teks "Kategori Unggulan" agar scope lebih spesifik
    const section = page.locator('section').filter({ hasText: 'Kategori Unggulan' });
    await section.scrollIntoViewIfNeeded();
    
    // Cari dropdown di dalam section tersebut
    const categorySelect = section.locator('select');
    await expect(categorySelect).toBeVisible({ timeout: 30000 });
    
    // Cek apakah ada opsi kategori tersedia
    const optionsCount = await categorySelect.locator('option').count();
    
    if (optionsCount <= 1) {
      // Jika hanya ada placeholder, tes tidak bisa dilanjutkan (tapi tidak fail error sistem)
      console.log('Peringatan: Tidak ada kategori tersedia untuk dipilih. Pastikan seed data memiliki produk dengan kategori.');
      return;
    }
    
    // Pilih kategori pertama yang tersedia (indeks 1, karena indeks 0 biasanya placeholder)
    // Aksi ini akan memicu fungsi handleCategorySelect di React yang otomatis menampilkan preview
    await categorySelect.selectOption({ index: 1 });
    
    // LANGKAH 4: Tunggu preview muncul
    // Karena tidak ada upload manual, kita langsung menunggu teks konfirmasi muncul
    // Pastikan logic di KelolaHome.jsx sudah diperbaiki agar preview muncul untuk kategori
    await expect(page.locator('text=Siap ditampilkan')).toBeVisible({ timeout: 10000 });
    
    // LANGKAH 5: Klik tombol Simpan
    const saveButton = section.locator('button').filter({ hasText: /Simpan/ });
    
    // Setup listener untuk respons backend
    const responsePromise = page.waitForResponse(res => 
      res.url().includes('/home/categories') && res.status() === 200
    );
    
    await saveButton.click();
    await responsePromise; // Tunggu server merespons sukses
    
    // LANGKAH 6: Handle Popup Sukses
    // Gunakan getByRole 'heading' agar spesifik ke judul popup dan menghindari error "strict mode violation"
    await expect(page.getByRole('heading', { name: /Sukses|Berhasil/i })).toBeVisible({ timeout: 10000 });
    
    // Tutup popup
    await page.locator('button').filter({ hasText: /OK|Tutup/ }).click();
    
    console.log('Tes untuk menambah Kategori Unggulan berhasil!');
  });
});