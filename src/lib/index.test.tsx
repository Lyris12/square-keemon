import '@testing-library/jest-dom'
import 'vitest-canvas-mock'
import { it, describe, expect } from 'vitest'
import { render } from '@testing-library/react'
import Square from './index'

describe('Square component', () => {
  it('renders with default props', () => {
    const { container } = render(<Square size={250} />)
    const canvasElement = container.querySelector('canvas')

    expect(canvasElement).toBeInTheDocument()
    expect(canvasElement).toHaveAttribute('width', '250')
    expect(canvasElement).toHaveAttribute('height', '250')
  })

  it('renders with custom props', () => {
    const { container } = render(<Square size={300} direction="V" smooth />)
    const canvasElement = container.querySelector('canvas')

    expect(canvasElement).toBeInTheDocument()
    expect(canvasElement).toHaveAttribute('width', '300')
    expect(canvasElement).toHaveAttribute('height', '300')
  })
})
