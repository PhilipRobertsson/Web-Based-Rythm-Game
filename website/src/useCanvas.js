import { useRef, useEffect } from 'react'

const useCanvas = (draw,options={}) =>{
    const canvasRef = useRef(null)

    useEffect(()=>{
        const canvas = canvasRef.current
        const context = canvas.getContext(options.context || '2d')
        let framecount = 0
        let animationFrameId

        const render = () =>{
            framecount++
            draw(context, framecount)
            animationFrameId = window.requestAnimationFrame(render)
        }

        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    },[draw])

    return canvasRef
}

export default useCanvas
