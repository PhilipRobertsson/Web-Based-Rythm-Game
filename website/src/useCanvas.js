import { useRef, useEffect, useState } from 'react'

const useCanvas = (draw,options={}) =>{
    const canvasRef = useRef(null)
    let [framecount, setFrameCount] = useState(0)

    useEffect(()=>{
        const canvas = canvasRef.current
        const context = canvas.getContext(options.context || '2d')
        let animationFrameId

        const render = () =>{
            if(framecount < canvas.width){
                setFrameCount(framecount++)
            }else{
                setFrameCount(0)
            }
            draw(context, framecount)
            animationFrameId = window.requestAnimationFrame(render)
        }

        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    },[draw,framecount])

    return canvasRef
}

export default useCanvas
