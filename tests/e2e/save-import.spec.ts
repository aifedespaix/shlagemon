import { Buffer } from 'node:buffer'
import { expect, test } from '@playwright/test'
import { exportSave } from '../../src/utils/save-code'

function createFilePayload(content: string) {
  return {
    name: 'save.shlag',
    mimeType: 'text/plain',
    buffer: Buffer.from(content),
  }
}

test.describe('save import page', () => {
  test('loads file through input', async ({ page }) => {
    const save = exportSave({ player: { name: 'Ash' } })
    await page.goto('/save/import')
    await page.setInputFiles('input[type="file"]', createFilePayload(save))
    await expect(page.getByText('summary', { exact: false })).toBeVisible()
  })

  test('loads file via dropzone', async ({ page }) => {
    const save = exportSave({ player: { name: 'Ash' } })
    await page.goto('/save/import')
    const dropZone = page.getByRole('button', { name: /drop/i })
    await dropZone.setInputFiles(createFilePayload(save))
    await expect(page.getByText('summary', { exact: false })).toBeVisible()
  })

  test('preloads file via share target', async ({ page }) => {
    const save = exportSave({ player: { name: 'Ash' } })
    const file = new File([save], 'save.shlag')
    const form = new FormData()
    form.append('file', file)
    await page.goto('/save/import', { waitUntil: 'domcontentloaded' })
    await page.evaluate(async (fd) => {
      const res = await fetch('/save/import', { method: 'POST', body: fd })
      return res.ok
    }, form)
    await expect(page.getByText('summary', { exact: false })).toBeVisible()
  })

  test('confirmation dialog traps focus', async ({ page }) => {
    const save = exportSave({ player: { name: 'Ash' } })
    await page.goto('/save/import')
    await page.setInputFiles('input[type="file"]', createFilePayload(save))
    await page.getByRole('button', { name: /import/i }).click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await page.keyboard.press('Tab')
    await expect(page.getByRole('button', { name: /yes, import/i })).toBeFocused()
  })

  test('invalid file displays error', async ({ page }) => {
    await page.goto('/save/import')
    await page.setInputFiles('input[type="file"]', createFilePayload('invalid'))
    await expect(page.getByRole('alert')).toHaveText(/invalid/i)
  })

  test('checksum mismatch shows error', async ({ page }) => {
    const save = exportSave({ player: { name: 'Ash' } })
    const tampered = save.slice(0, -1)
    await page.goto('/save/import')
    await page.setInputFiles('input[type="file"]', createFilePayload(tampered))
    await expect(page.getByRole('alert')).toHaveText(/invalid/i)
  })

  test('incompatible version shows error', async ({ page }) => {
    const payload = JSON.stringify({ version: 999, data: {} })
    await page.goto('/save/import')
    await page.setInputFiles('input[type="file"]', createFilePayload(payload))
    await expect(page.getByRole('alert')).toHaveText(/unsupported/i)
  })
})
