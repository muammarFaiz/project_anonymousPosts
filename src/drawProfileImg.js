export default function drawProfileImg() {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  const chei = 248, cwid = 300
  canvas.height = chei
  canvas.width = cwid
  
  const mpi = Math.PI * 2
  const marginleft = (cwid - 205) / 2
  const figureposx = marginleft + 100
  
  ctx.strokeStyle = 'green'
  ctx.lineWidth = 5
  
  ctx.beginPath()
  ctx.arc(figureposx, 100, 50, 0, mpi)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
  
  ctx.beginPath()
  ctx.arc(figureposx, 250, 100, mpi / 2, mpi)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
  // console.log(canvas.toDataURL('image/webp'))
  return canvas.toDataURL('image/webp')
}