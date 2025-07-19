import type { DialogNode } from '~/type/dialog'

export function buildDialog(
  messages: string[],
  onFinish?: () => void,
  finalLabel = 'Merci !',
): DialogNode[] {
  return messages.map((text, idx) => {
    const id = idx === 0 ? 'start' : `step${idx + 1}`
    const responses = [] as DialogNode['responses']
    if (idx > 0)
      responses.push({ label: 'Retour', nextId: idx === 1 ? 'start' : `step${idx}`, type: 'danger' })
    if (idx < messages.length - 1)
      responses.push({ label: 'Continuer', nextId: `step${idx + 2}`, type: 'primary' })
    else
      responses.push({ label: finalLabel, type: 'valid', action: onFinish })
    return { id, text, responses }
  })
}
