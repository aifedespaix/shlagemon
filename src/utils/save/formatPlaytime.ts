/**
 * Convert a duration expressed in milliseconds into a human readable string.
 *
 * The output omits zero-value units and always includes seconds. Examples:
 *   - 65000 => "1m 5s"
 *   - 3_600_000 => "1h"
 *   - 86_400_000 + 3_600_000 => "1d 1h"
 *
 * @param ms - Duration in milliseconds.
 * @returns A formatted string such as "1h 2m 3s".
 */
export function formatPlaytime(ms: number): string {
  if (!Number.isFinite(ms) || ms <= 0)
    return '0s'

  const totalSeconds = Math.floor(ms / 1_000)
  const seconds = totalSeconds % 60
  const totalMinutes = Math.floor(totalSeconds / 60)
  const minutes = totalMinutes % 60
  const totalHours = Math.floor(totalMinutes / 60)
  const hours = totalHours % 24
  const days = Math.floor(totalHours / 24)

  const parts: string[] = []
  if (days > 0)
    parts.push(`${days}d`)
  if (hours > 0)
    parts.push(`${hours}h`)
  if (minutes > 0)
    parts.push(`${minutes}m`)
  if (seconds > 0 || parts.length === 0)
    parts.push(`${seconds}s`)

  return parts.join(' ')
}
