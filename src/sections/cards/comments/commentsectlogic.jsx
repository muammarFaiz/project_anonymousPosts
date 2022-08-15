import { useState } from "react"
import { useEffect } from "react"
import req from "../../../axiosSetup"
import { useDispatch, useSelector } from "react-redux/es/exports"
import { setMessageContent, setRefreshCommSect } from "../../../reduxSlices/mainstates/mainstates"
import { useContext } from "react"
import { Context } from "../../../App"

export default function CommSectLogic(props) {
  const [loading, setLoading] = useState('init')
  const [input1, setInput1] = useState('')
  const [commArr, setCommArr] = useState([])
  const [imgArr, setImgArr] = useState([])

  const memory = useContext(Context)
  const dispatch = useDispatch()
  const refreshCommSect = useSelector(state => state.memory.refreshCommSect)

  useEffect(() => {
    if(
      loading === 'new comm' ||
      loading === 'init' ||
      refreshCommSect === 'comm deleted'
    ) {
      // get the data from db
      // create route to get the comments
      let result
      const runme = async () => {
        result = await req('comment', 'POST', {update: 'get', secretid: props.id})
        const imagesobj = await memory.getimgname(result)
        setImgArr(imagesobj)
        console.log(result)
        setCommArr(result)
        setLoading(false)
        dispatch(setRefreshCommSect(''))
      }
      runme()
    }
  }, [loading, props.id, dispatch, refreshCommSect, memory])
  // render extra 3 kali???

  const inputHandler = (e) => {
    setInput1(e.target.value)
  }

  const sendComm = async () => {
    if(input1 === '') {
      dispatch(setMessageContent({title: 'rejected', description: 'comment input cannot empty'}))
      return
    }
    setLoading(true)
    const result = await req('comment', 'POST', {
      update: 'save', content: input1, commindex: undefined, secretid: props.id
    })
    if(result === 'ok') {
      setLoading('new comm')
    } else {
      dispatch(setMessageContent({title: 'fail', description: result.error ? result.error : 'fail to send comment'}))
      setLoading(false)
    }
  }

  const getimgobj = (creatorid) => {
    const img = imgArr.find(obj => obj._id === creatorid)
    return img
  }

  return {
    loading,
    inputHandler,
    input1,
    sendComm,
    commArr,
    refreshCommSect,
    getimgobj
  }
}