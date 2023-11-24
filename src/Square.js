import { useRef, useEffect } from 'react';

const Square = props => {
	const canvasRef = useRef(null)
	useEffect(() => {
		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		const w = ctx.canvas.width, h = ctx.canvas.height,
			d = 1/10**9, colors = ['#f00', '#ff8000', '#ff0', '#80ff00', '#0f0', '#00ff80', '#0ff', '#0080ff', '#00f', '#8000ff', '#f0f', '#ff0080']
		ctx.clearRect(0, 0, w, h)
		let direction
		if(props.direction) direction = props.direction
		else direction = 'H'
		if(direction.includes('D') && props.smooth) {
			const gradient = ctx.createLinearGradient(
				w * direction.includes('R'),
				h * direction.includes('B'),
				w * direction.includes('L'),
				h * direction.includes('T')
			); for(let i = 0; i <= colors.length; ++i)
				for(let j = 0; j < 2; ++j)
					gradient.addColorStop(
						(i + j) / 13 - j * d,
						colors[i % colors.length]
					)
			ctx.fillStyle = gradient; ctx.fillRect(0, 0, w, h)
		} else for (let i = 0; i < 13; ++i)
				for (let j = 0; j < 13; ++j) {
					let f = {
						//Horizontal
						H: 30 * i % 360,
						R: -30 * i % 360,
						//Vertical
						V: 30 * j % 360,
						B: -30 * j % 360,
						//Diagonal
						D: {
							//from Top
							T: {
								//Left -> Right
								L: (15 * i % 360) + (15 * j % 360),
								//Right -> Left
								R: (15 * (12 - i) % 360) + (15 * j % 360)
							}, //from Bottom
							B: {
								//Left -> Right
								L: (15 * i % 360) + (15 * (12 - j) % 360),
								//Right -> Left
								R: (15 * (12 - i) % 360) + (15 * (12 - j) % 360)
							}
						}
					}; f.L = f.H; f.T = f.V; f.D.L = {
						T: f.D.T.L,
						B: f.D.B.L
					}; f.D.R = {
						T: f.D.T.R,
						B: f.D.B.R
					};
					for(let dir of direction.split(''))
						f = f[dir]
					ctx.fillStyle = `hsl(
						${f},
						100%,
						50%
					)`; ctx.fillRect(
						Math.floor(w / 13 * i), Math.floor(h / 13 * j),
						Math.ceil(w / 13), Math.ceil(h / 13))
				}
	}, [props]);
	return <canvas ref={canvasRef} width={props.size} height={props.size} />
}

export { Square }
