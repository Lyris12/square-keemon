import { useRef, useEffect } from 'react'

type SquareType = {
  size: number
  direction?: string
  smooth?: boolean
}

/**
 * Draws a square containing a customizable rainbow gradient.
 */
function Square({ size = 250, direction = 'H', smooth = false }: SquareType) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current
    const ctx: CanvasRenderingContext2D | null = canvas!.getContext('2d')
    const w: number = ctx!.canvas.width,
      h: number = ctx!.canvas.height,
      d: number = 1 / 10 ** 9,
      colors: string[] = [
        '#f00',
        '#ff8000',
        '#ff0',
        '#80ff00',
        '#0f0',
        '#00ff80',
        '#0ff',
        '#0080ff',
        '#00f',
        '#8000ff',
        '#f0f',
        '#ff0080',
      ]
    ctx!.clearRect(0, 0, w, h)
    if (direction.includes('D') && smooth) {
      const gradient = ctx!.createLinearGradient(
        w * +direction.includes('R'),
        h * +direction.includes('B'),
        w * +direction.includes('L'),
        h * +direction.includes('T'),
      )
      for (let i = 0; i <= colors.length; ++i)
        for (let j = 0; j < 2; ++j)
          gradient.addColorStop((i + j) / 13 - j * d, colors[i % colors.length])
      ctx!.fillStyle = gradient
      ctx!.fillRect(0, 0, w, h)
    } else
      for (let i = 0; i < 13; ++i)
        for (let j = 0; j < 13; ++j) {
          const H = (30 * i) % 360
          const V = (-30 * i) % 360
          const DTL = ((15 * i) % 360) + ((15 * j) % 360)
          const DBL = ((15 * i) % 360) + ((15 * (12 - j)) % 360)
          const DTR = ((15 * (12 - i)) % 360) + ((15 * j) % 360)
          const DBR = ((15 * (12 - i)) % 360) + ((15 * (12 - j)) % 360)
          let f: number = 0
          if (direction.startsWith('D')) {
            if (direction.includes('T') && direction.includes('L')) f = DTL
            else if (direction.includes('T') && direction.includes('R')) f = DTR
            else if (direction.includes('B') && direction.includes('L')) f = DBL
            else if (direction.includes('B') && direction.includes('R')) f = DBR
          } else if (direction.includes('H') || direction.includes('L') || direction.includes('R'))
            f = H
          else if (direction.includes('V') || direction.includes('T') || direction.includes('B'))
            f = V
          else return
          ctx!.fillStyle = `hsl(
						${f},
						100%,
						50%
					)`
          ctx!.fillRect(
            Math.floor((w / 13) * i),
            Math.floor((h / 13) * j),
            Math.ceil(w / 13),
            Math.ceil(h / 13),
          )
        }
  }, [size, direction, smooth])

  return <canvas ref={canvasRef} width={size} height={size} />
}

export default Square
