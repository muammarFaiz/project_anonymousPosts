import { useContext } from "react"
import { useRef, useState } from "react"
import { Context } from "../../App"
import req from "../../axiosSetup"

const WIDTH = 100
const HEIGHT = 100

export default function UserLogic() {
  const imgPreview = useRef(null)
  const [modifiedImg, setModifiedImg] = useState('')
  const imgUsingBuffer = useRef(null)
  const imgFromServer = useRef(null)

  const memory = useContext(Context)

  const handleImg = v => {
    const imgToEdit = v.target.files[0]
    // console.log(imgToEdit);
    const reader = new FileReader()
    reader.onload = e => {
      const imgDrawing = document.createElement('img')
      imgDrawing.onload = e => {
        const  canvas = document.createElement('canvas')
        canvas.width = WIDTH
        canvas.height = HEIGHT
        const context = canvas.getContext('2d')
        context.drawImage(imgDrawing, 0, 0, WIDTH, HEIGHT)
        imgPreview.current.src = canvas.toDataURL(imgToEdit.type)
        canvas.toBlob(b => {
          if(b) {
            console.log(b);
            const tosend = new File([b], imgToEdit.name, {type: imgToEdit.type})
            setModifiedImg(tosend)
          } else {
            alert('toBlob error...')
          }
        })
      }
      imgDrawing.src = reader.result
    }
    reader.readAsDataURL(imgToEdit)
    // imgPreview.current.src = URL.createObjectURL(imageToSend)
    // setModifiedImg(imageToSend)
  }

  const sendImage = async () => {
    if(modifiedImg !== '') {
      memory.setHomeLoading(true)
      const result = await req('profileImg', 'POST', {img: modifiedImg}, undefined, 'multipart/form-data')
      console.log(result);
      imgUsingBuffer.current.src = 'data:' + result.mimetype + ';base64,' + result.base64
      memory.setHomeLoading(false)
    } else {
      alert('there is no image to upload')
    }
  }

  const getFromServer = async () => {
    const result = await req('userimage', 'GET')
    console.log(result);
    imgFromServer.current.src = 'data:' + result.mimetype + ';base64,' + result.base64
  }

  return {
    handleImg,
    sendImage,
    imgPreview,
    imgUsingBuffer,
    imgFromServer,
    getFromServer
  }
}