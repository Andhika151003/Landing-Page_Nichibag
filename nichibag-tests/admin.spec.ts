// tests/admin.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Admin Panel E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/Admin');
  });

  // -- Tes 1: Memastikan admin bisa login dengan kredensial yang valid. --
  test('Harus berhasil login dengan kredensial yang benar', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Masuk' }).click();
    await expect(page.getByText('Login Berhasil 🎉')).toBeVisible();
    await expect(page.getByText('Login Berhasil 🎉')).not.toBeVisible();
    await expect(page).toHaveURL(/.*Dashboard/);
    await expect(page.getByText('Selamat datang kembali, Admin!')).toBeVisible();
  });

  // -- Tes 2: Memastikan pengguna tidak bisa login dengan password salah. --
  test('Harus gagal login dengan password yang salah', async ({ page }) => {

    await page.getByPlaceholder('Username').fill('admin');
    await page.getByPlaceholder('Password').fill('password-salah');
    await page.getByRole('button', { name: 'Masuk' }).click();
    await expect(page.getByText('Login Gagal ❌')).toBeVisible();
    await expect(page).not.toHaveURL(/.*Dashboard/);
  });

});