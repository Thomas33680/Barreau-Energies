import { useEffect, useRef, useState } from 'react'

interface Props {
  value: string | null
  onSign: (dataUrl: string) => void
  onClear: () => void
}

export function SignaturePad({ value, onSign, onClear }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawingRef = useRef(false)
  const [isEmpty, setIsEmpty] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const ratio = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * ratio
    canvas.height = rect.height * ratio
    ctx.scale(ratio, ratio)
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, rect.width, rect.height)
    ctx.lineWidth = 2.2
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#16232b'
  }, [])

  function getPos(e: React.PointerEvent<HTMLCanvasElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  function handlePointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    drawingRef.current = true
    const { x, y } = getPos(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
    canvas.setPointerCapture(e.pointerId)
  }

  function handlePointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawingRef.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const { x, y } = getPos(e)
    ctx.lineTo(x, y)
    ctx.stroke()
    setIsEmpty(false)
  }

  function handlePointerUp() {
    drawingRef.current = false
  }

  function clear() {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    setIsEmpty(true)
    onClear()
  }

  function save() {
    const canvas = canvasRef.current
    if (!canvas || isEmpty) return
    onSign(canvas.toDataURL('image/png'))
  }

  if (value) {
    return (
      <div className="signature-block">
        <img src={value} alt="Signature client" className="signature-preview" />
        <button type="button" className="btn btn-secondary" onClick={clear}>
          Effacer la signature
        </button>
      </div>
    )
  }

  return (
    <div className="signature-block">
      <canvas
        ref={canvasRef}
        className="signature-canvas"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      />
      <div className="signature-actions">
        <button type="button" className="btn btn-secondary" onClick={clear}>
          Effacer
        </button>
        <button type="button" className="btn btn-primary" onClick={save} disabled={isEmpty}>
          Valider la signature
        </button>
      </div>
    </div>
  )
}
