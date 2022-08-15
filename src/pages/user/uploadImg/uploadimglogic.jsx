import { useRef, useState } from "react"
import req from '../../../axiosSetup'
import { useDispatch } from "react-redux"
import { setShowChangeImg, setUserImgSrc } from "../../../reduxSlices/mainstates/mainstates"
import { useEffect } from "react"

const WIDTH = 300
const HEIGHT = 300

export default function UploadImgLogic() {
  const imgPreview = useRef(null)
  const [modifiedImg, setModifiedImg] = useState('')
  const [specialLoading, setSpecialLoading] = useState('')
  const dispatch = useDispatch()
  const inputElement = useRef(null)
  

  const imgOnchange = v => {
    const imgToEdit = v.target.files[0]
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
      await req('profileImg', 'POST', { img: modifiedImg })
      await getFromServer()
      setSpecialLoading(false)
      dispatch(setShowChangeImg(false))
    } else {
      alert('there is no image to upload')
    }
  }

  const getFromServer = async () => {
    const result = await req('userimage', 'GET')
    if(result.mimetype) {
      dispatch(setUserImgSrc('data:' + result.mimetype + ';base64,' + result.base64))
    } else {
      alert('failed to get the user image')
    }

  }

  useEffect(() => {
    inputElement.current.focus()
  }, [])

  const exit = (e) => {
    if(e.key === 'Escape') dispatch(setShowChangeImg(false))
  }

  return {
    imgOnchange,
    sendImage,
    imgPreview,
    getFromServer,
    specialLoading,
    inputElement,
    exit
  }
}