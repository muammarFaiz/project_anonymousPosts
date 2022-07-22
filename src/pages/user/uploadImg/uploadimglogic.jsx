import { useContext, useRef, useState } from "react"
import req from '../../../axiosSetup'
import { Context } from "../../../App"

const WIDTH = 300
const HEIGHT = 300

export default function UploadImgLogic() {
  const imgPreview = useRef(null)
  const [modifiedImg, setModifiedImg] = useState('')
  const [specialLoading, setSpecialLoading] = useState('')
  
  const memory = useContext(Context)

  const imgOnchange = v => {
    const imgToEdit = v.target.files[0]
    console.log(imgToEdit);
    const reader = new FileReader()
    reader.onload = e => {
      const imgDrawing = document.createElement('img')
      imgDrawing.onload = ev => {
        const canvas = document.createElement('canvas')
        const imgHeight = HEIGHT
        const reducedPercentage = HEIGHT * 100 / imgDrawing.height
        const imgWidth = imgDrawing.width * reducedPercentage / 100
        canvas.width = WIDTH
        canvas.height = HEIGHT
        const xHeight = 0
        const xWidth = imgWidth > WIDTH ? ((imgWidth - WIDTH) / 2) * -1 : (WIDTH - imgWidth) / 2
        const context = canvas.getContext('2d')
        context.drawImage(imgDrawing, xWidth, xHeight, imgWidth, imgHeight)
        // context.drawImage(imgDrawing, 0, 0, imgWidth, imgHeight)
        const dataurl = canvas.toDataURL(imgToEdit.type)
        imgPreview.current.src = dataurl
        setModifiedImg({
          originalname: imgToEdit.name,
          mimetype: imgToEdit.type,
          base64: dataurl,
          size: imgToEdit.size,
          lastmodified: imgToEdit.lastModified
        })
      }
      imgDrawing.src = e.target.result
    }
    reader.readAsDataURL(imgToEdit)
  }

  const sendImage = async () => {
    if (modifiedImg !== '') {
      setSpecialLoading(true)
      const result = await req('profileImg', 'POST', { img: modifiedImg })
      console.log(result);
      // if result === ok then notif user upload succeed, and update the user image
      // also the preview image and user image maybe need to be a circle
      await getFromServer()
      setSpecialLoading(false)
      memory.setShowChangeImg(false)
    } else {
      alert('there is no image to upload')
    }
  }

  const getFromServer = async () => {
    const result = await req('userimage', 'GET')
    memory.setUserImgSrc('data:' + result.mimetype + ';base64,' + result.base64)
  }

  return {
    imgOnchange,
    sendImage,
    imgPreview,
    getFromServer,
    specialLoading
  }
}