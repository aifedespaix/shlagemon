/**
 * Read a {@link File} and safely parse its JSON content.
 *
 * @param file - The file to read.
 * @throws {Error} If the file cannot be read or the content is not valid JSON.
 * @returns The parsed JSON value.
 */
export async function safeJsonParse(file: File): Promise<unknown> {
  try {
    const text = await file.text()
    return JSON.parse(text)
  }
  catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    throw new Error(`Invalid JSON: ${message}`)
  }
}
