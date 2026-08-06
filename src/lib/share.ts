export async function sharePdf(blob: Blob, fileName: string, title: string, text: string): Promise<boolean> {
  const file = new File([blob], fileName, { type: 'application/pdf' })

  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title, text })
      return true
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return false
      return false
    }
  }
  return false
}

export function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export function buildMailtoLink(email: string, subject: string, body: string): string {
  const params = new URLSearchParams({ subject, body })
  return `mailto:${encodeURIComponent(email)}?${params.toString()}`
}

export function buildSmsLink(phone: string, body: string): string {
  const digits = phone.replace(/[^\d+]/g, '')
  const params = new URLSearchParams({ body })
  return `sms:${digits}?${params.toString()}`
}
