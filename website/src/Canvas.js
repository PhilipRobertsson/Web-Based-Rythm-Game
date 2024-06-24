import React from 'react'
import useCanvas from './useCanvas'

const Canvas = props => {  
  
    const { draw, options, ...rest } = props
    const [ context, speed, ...moreConfig ] = options
    const canvasRef = useCanvas(draw,{context,speed})

    return <canvas ref={canvasRef} {...rest}/>
  }

export default Canvas