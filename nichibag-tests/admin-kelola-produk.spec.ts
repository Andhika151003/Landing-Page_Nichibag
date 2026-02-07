import { test, expect } from '@playwright/test';

test.describe('Admin dapat mengelola Produk', () => {

  test.beforeEach(async ({ page }) => {
    // Reset data produk sebelum tes berjalan
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
    await page.waitForLoadState('networkidle');
    
    // Isi field dasar menggunakan selector name yang presisi
    await page.locator('input[name="name"]').fill('Produk Uji Coba Playwright');
    await page.locator('input[name="productCode"]').fill('PW-TEST-001');
    
    // Pilih Kategori
    const categorySelect = page.locator('select[name="category"]');
    await expect(categorySelect).toBeVisible();
    await categorySelect.selectOption({ index: 1 });
    
    // Isi Harga & Diskon (Gunakan selector name karena placeholder mungkin berbeda)
    await page.locator('input[name="price"]').fill('75000');
    await page.locator('input[name="discountPercentage"]').fill('15');
    
    // Isi Deskripsi
    await page.locator('textarea[name="description"]').fill('Ini adalah deskripsi produk yang dibuat oleh tes otomatis Playwright.');
    
    // Isi Spesifikasi (Opsional tapi baik untuk diisi)
    await page.locator('input[name="material"]').fill('Kertas Kraft Tebal');
    await page.locator('input[name="weight"]').fill('50');
    
    // LANGKAH 4: Menambah varian warna
    // Input warna & hex
    // React menggunakan input type="text" untuk nama warna di sebelah color picker
    const colorNameInput = page.locator('input[placeholder="Ketik Nama Warna"]');
    await colorNameInput.fill('Merah Maroon');
    
    // Upload gambar varian
    const imagePath = 'fixtures/test-image.png';
    const fileInput = page.locator('input[type="file"][multiple]');
    await fileInput.setInputFiles(imagePath);
    
    // Klik tombol "Tambah Varian Warna"
    const addColorBtn = page.getByRole('button', { name: 'Tambah Varian Warna' });
    await addColorBtn.click();
    
    // Verifikasi varian warna muncul di list
    await expect(page.getByText('Merah Maroon')).toBeVisible({ timeout: 10000 });
    
    // LANGKAH 5: Menyimpan produk
    const saveButton = page.getByRole('button', { name: 'Simpan' });
    
    // Setup listener response untuk memastikan data terkirim
    const responsePromise = page.waitForResponse(res => 
        res.url().includes('/products') && (res.status() === 200 || res.status() === 201)
    );
    
    await saveButton.click();
    await responsePromise;
    
    // LANGKAH 6: Verifikasi sukses
    // Gunakan getByRole heading agar spesifik ke judul popup "Sukses!"
    // Ini menghindari error "Strict mode violation"
    await expect(page.getByRole('heading', { name: /Sukses|Berhasil/i })).toBeVisible({ timeout: 10000 });
    
    // Tutup popup
    const okBtn = page.locator('button').filter({ hasText: /OK|Tutup/ }).first();
    if (await okBtn.isVisible()) {
      await okBtn.click();
    }

    console.log('Tes untuk menambah Produk baru berhasil!');
  });
});