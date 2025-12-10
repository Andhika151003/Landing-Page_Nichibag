import { test, expect } from '@playwright/test';

test.describe('Admin dapat mengelola Halaman About', () => {

  test.beforeEach(async ({ page }) => {
    // Pastikan menggunakan 127.0.0.1
    const response = await page.request.post('http://127.0.0.1:5000/api/about/testing/reset');
    expect(response.ok()).toBeTruthy();
  });

  test('dapat mengupload gambar baru untuk bagian "Siapa Kami"', async ({ page }) => {
    
    // LANGKAH 1: Navigasi
    await page.goto('/Dashboard');
    await page.getByRole('link', { name: 'Kelola About' }).click();
    await expect(page).toHaveURL(/.*kelola-about/);
    await expect(page.getByRole('heading', { name: 'Kelola Halaman About' })).toBeVisible();

    // LANGKAH 2: Pilih File (Preview muncul lokal, belum upload ke server)
    const imagePath = 'fixtures/test-image.png';
    await page.locator('input[type="file"]').setInputFiles(imagePath);
    
    // Verifikasi preview muncul (ini logic frontend, jadi instan)
    await expect(page.locator('img[alt="Preview"]')).toBeVisible();

    // LANGKAH 3: Simpan (Upload & Update terjadi DI SINI)
    // Kita tunggu 2 hal: Request Upload gambar DAN Request Update data About
    const uploadResponsePromise = page.waitForResponse(res => 
      res.url().includes('/api/upload') && res.status() === 200
    );
    const saveResponsePromise = page.waitForResponse(res => 
      res.url().includes('/api/about') && res.request().method() === 'PUT' && res.status() === 200
    );
    
    // Klik tombol simpan yang akan memicu kedua request di atas
    await page.getByRole('button', { name: 'Simpan Perubahan' }).click();
    
    // Tunggu kedua request selesai
    await uploadResponsePromise;
    await saveResponsePromise;
    
    // LANGKAH 4: Handle Popup dan Verifikasi Akhir
    await expect(page.getByText('Data halaman About berhasil disimpan.')).toBeVisible();
    await page.getByRole('button', { name: 'OK' }).click();

    // Reload untuk memastikan data tersimpan di server
    await page.reload();
    // Gambar harusnya sudah bersumber dari folder uploads server
    await expect(page.locator('img[alt="Preview"]')).toHaveAttribute('src', /.*uploads/);

    console.log('Tes untuk mengedit Halaman About berhasil!');
  });
});