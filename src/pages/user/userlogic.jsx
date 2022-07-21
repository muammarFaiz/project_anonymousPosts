import { useContext } from "react"
import { useRef, useState } from "react"
import { Context } from "../../App"
import req from "../../axiosSetup"

const WIDTH = 200
const HEIGHT = 200

export default function UserLogic() {
  const imgPreview = useRef(null)
  const [modifiedImg, setModifiedImg] = useState('')
  const imgUsingBuffer = useRef(null)
  const imgFromServer = useRef(null)

  const memory = useContext(Context)

  const imgOnchange = v => {
    const imgToEdit = v.target.files[0]
    const reader = new FileReader()
    reader.onload = e => {
      const imgDrawing = document.createElement('img')
      imgDrawing.onload = ev => {
        const  canvas = document.createElement('canvas')
        canvas.width = WIDTH
        canvas.height = HEIGHT
        const context = canvas.getContext('2d')
        context.drawImage(imgDrawing, 0, 0, WIDTH, HEIGHT)
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
    if(modifiedImg !== '') {
      memory.setHomeLoading(true)
      const result = await req('profileImg', 'POST', {img: modifiedImg})
      console.log(result);
      // if result === ok then notif user upload succeed, and update the user image
      // also the preview image and user image maybe need to be a circle
      imgUsingBuffer.current.src = 'data:' + result.mimetype + ';base64,' + result.base64
      memory.setHomeLoading(false)
    } else {
      alert('there is no image to upload')
    }
  }

  const getFromServer = async () => {
    const result = await req('userimage', 'GET')
    imgFromServer.current.src = 'data:' + result.mimetype + ';base64,' + result.base64
  }

  return {
    imgOnchange,
    sendImage,
    imgPreview,
    imgUsingBuffer,
    imgFromServer,
    getFromServer
  }
}