const w : number = window.innerWidth 
const h : number = window.innerHeight 
const parts : number = 4 
const scGap : number = 0.02 / parts 
const strokeFactor : number = 90 
const sizeFactor : number = 7.9 
const tFactor : number = 13.9 
const delay : number = 20 
const backColor : string = "#BDBDBD"
const colors : Array<string> = [
    "#F44336",
    "#3F51B5",
    "#4CAF50",
    "#FF9800", 
    "#009688"
] 

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n 
    }

    static sinify(scale) : number {
        return Math.sin(scale * Math.PI)
    }
}

class DrawingUtil {

    static drawLine(context : CanvasRenderingContext2D, x1 : number, y1 : number, x2 : number, y2 : number) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
    }

    static drawRectTrapzPath(context : CanvasRenderingContext2D, scale : number) {
        const sf : number = ScaleUtil.sinify(scale)
        const sf1 : number = ScaleUtil.divideScale(sf, 0, parts)
        const sf2 : number = ScaleUtil.divideScale(sf, 1, parts)
        const sf3 : number = ScaleUtil.divideScale(sf, 2, parts)
        const sf4 : number = ScaleUtil.divideScale(sf, 3, parts)
        const size : number = Math.min(w, h) / sizeFactor 
        const tSize : number = Math.min(w, h) / tFactor 
        context.save()
        context.translate(w / 2, h / 2)
        DrawingUtil.drawLine(context, -size / 2, h / 2, -size / 2, h / 2 - (h / 2 - tSize) * sf1)
        DrawingUtil.drawLine(context, -size / 2, -tSize, -size / 2 + size * sf2, -tSize + tSize * sf2)
        DrawingUtil.drawLine(context, size / 2, 0, size / 2, h * 0.5 * sf3)
        context.save()
        context.beginPath()
        context.moveTo(-size / 2, h / 2)
        context.lineTo(-size / 2, -tSize)
        context.lineTo(size / 2, 0)
        context.lineTo(size / 2, h / 2)
        context.lineTo(-size / 2, h / 2)
        context.clip()
        context.fillRect( -size / 2, h / 2 - (h / 2 + tSize) * sf4, size, (h / 2 + tSize) * sf4)
        context.restore()
        context.restore()
    }
    
    static drawRTFNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor 
        context.fillStyle = colors[i]
        context.strokeStyle = colors[i]
        DrawingUtil.drawRectTrapzPath(context, scale)
    } 
}