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
    await expect(page).toHaveURL(/.*kelola-Produk/);
    await expect(page).toHaveURL(/.*kelola-Produk/);
    await expect(page.getByRole('heading', { name: 'Kelola Produk' })).toBeVisible();

    // LANGKAH 2: Buka form
    await page.getByRole('button', { name: 'Tambah Produk' }).click();
    await expect(page.getByRole('heading', { name: 'Tambah Produk Baru' })).toBeVisible();

    // LANGKAH 3: Mengisi semua field utama pada form
    // Pastikan form terlihat sepenuhnya
    await expect(page.getByRole('heading', { name: 'Tambah Produk Baru' })).toBeVisible({ timeout: 30000 });
    await expect(page.getByLabel('Nama Produk')).toBeVisible({ timeout: 30000 });
    await page.getByLabel('Nama Produk').fill('Produk Uji Coba Playwright');
    await page.getByLabel('Kode Produk').fill('PW-TEST-001');
    await page.getByLabel('Kategori').selectOption('Paper bag');
    await page.getByLabel('Harga').fill('75000');
    await page.getByLabel('Diskon (%)').fill('15');
    await page.getByLabel('Deskripsi Produk').fill('Ini adalah deskripsi produk yang dibuat oleh tes otomatis Playwright.');
    
    await page.getByLabel('Bahan').fill('Kertas Kraft Tebal');
    await page.getByLabel('Berat (gram)').fill('50');
    await page.getByLabel('Panjang (cm)').fill('30');
    await page.getByLabel('Lebar (cm)').fill('10');
    await page.getByLabel('Tinggi (cm)').fill('40');
    // await page.getByLabel('Link Button Order').fill('https://shopee.co.id/produk-uji-coba');

    // LANGKAH 4: Menambah varian warna
    const imagePath = 'fixtures/test-image.png';
    await expect(page.getByPlaceholder('Ketik Nama Warna')).toBeVisible({ timeout: 30000 });
    await page.getByPlaceholder('Ketik Nama Warna').fill('Merah Maroon');
    await page.locator('input[type="file"][multiple]').setInputFiles(imagePath);
    await page.getByRole('button', { name: 'Tambah Varian Warna' }).click();
    await expect(page.getByText('Merah Maroon')).toBeVisible();

    // LANGKAH 5: Menyimpan produk
    const responsePromise = page.waitForResponse('**/products');
    await page.getByRole('button', { name: 'Simpan' }).click();
    await responsePromise;

    // LANGKAH 6: Handle Popup dan Verifikasi Akhir
    await expect(page.getByText('Produk berhasil disimpan.')).toBeVisible();
    await page.getByRole('button', { name: 'OK' }).click();
    await expect(page.getByRole('heading', { name: 'Tambah Produk Baru' })).not.toBeVisible();
    await expect(page.getByText('Produk Uji Coba Playwright')).toBeVisible();

    console.log('Tes untuk menambah Produk baru berhasil!');
  });
});