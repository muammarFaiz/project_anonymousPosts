import { useEffect, useRef } from "react"
import { useState } from "react"
import req from "../../axiosSetup";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { mainLoadingSwitch, setMessageContent, setPoststatus } from "../../reduxSlices/mainstates/mainstates";


export default function InputSecretLogic() {
  const editorRef = useRef(null);
  const [dirty, setDirty] = useState(false)
  const audioRecorder = useRef(null)
  const audioChunks = useRef([])
  const [audioElem, setAudioElem] = useState('')
  const [recordButton, setRecordButton] = useState(true)
  const [secs, setSecs] = useState(5)
  const intervalId = useRef(null)

  const dispatch = useDispatch()
  
  const postSecret = async () => {
    dispatch(mainLoadingSwitch())
    if (editorRef.current) {
      const content = editorRef.current.getContent()
      let audioBlob
      if(audioChunks.current.length) audioBlob = new Blob(audioChunks.current, { type: audioChunks.current[0].type })

      if(!content && !audioBlob) {
        dispatch(mainLoadingSwitch())
        dispatch(setMessageContent({title: 'denied', description: 'there is nothing to send'}))
        return
      }
      if(content.length > 500) {
        dispatch(mainLoadingSwitch())
        dispatch(setMessageContent({title: 'denied', description: 'content too long, reduce the content or its styling'}))
        return
      }
      const result = await req('postsecret', 'POST', {
        content: content, audiobuffer: audioBlob
      }, undefined, 'multipart/form-data')
      if (result === 'ok') {
        dispatch(setPoststatus('secret posted'))
        setDirty(false)
        editorRef.current.setDirty(false)
      } else if (result === 'rejected') {
        dispatch(setMessageContent({title: 'rejected', description: 'you are not logged in'}))
      } else if(result.error) {
        dispatch(setMessageContent({title: 'error', description: result.error.errors[0].msg}))
      } else {
        dispatch(setMessageContent({title: 'fail', description: 'failed to create post'}))
      }
    } else {
      dispatch(setMessageContent({title: 'rejected', description: 'editor is not loaded'}))
    }
    dispatch(mainLoadingSwitch())
  }

  const editorOnInit = (evt, editor) => editorRef.current = editor

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const audioMediaRecorder = new MediaRecorder(stream)

      audioChunks.current = []
      audioMediaRecorder.ondataavailable = event => {
        audioChunks.current.push(event.data)
      }
      audioMediaRecorder.onstop = event => {
        stream.getTracks().forEach(track => track.stop())
        dispatch(mainLoadingSwitch())
        const audioBlob = new Blob(audioChunks.current, {type: audioChunks.current[0].type})
        setAudioElem(
          <>
            <audio src={URL.createObjectURL(audioBlob)} controls></audio>
            <button onClick={removeCurrentAudio}>X</button>
          </>
        )
        setDirty(true)
        setSecs(5)
        dispatch(mainLoadingSwitch())
        setRecordButton(true)
      }
      audioMediaRecorder.start()
      audioRecorder.current = audioMediaRecorder
      setRecordButton(false)
    })
  }
  const stopRecording = () => {
    if(audioRecorder.current.state !== 'inactive') audioRecorder.current.stop()
  }

  const removeCurrentAudio = () => {
    setAudioElem('')
    audioChunks.current = []
  }
  
  useEffect(() => {
    if(!recordButton && !intervalId.current) {
      intervalId.current = setInterval(() => {
        setSecs(prev => prev - 1)
      }, 1000);
    }
    if((recordButton || secs === 0) && intervalId.current) {
      console.log('clearinterval running...')
      clearInterval(intervalId.current)
      stopRecording()
      intervalId.current = null
    }
  }, [recordButton, secs])
  
  // upgrade css for mobile, visit heroku in smartphone for the ultimate test
  const initTiny = () => {
    return {
      height: 250,
      width: 600,
    menu: {
        format: { title: 'Format', items: 'codeformat removeformat' }
      },
      menubar: 'view insert format',
      toolbar: 'undo redo | bold italic underline strikethrough subscript superscript codeformat blockquote | ' +
        'alignleft aligncenter alignjustify alignright alignnone'
    }
  }
 
  return {
    postSecret,
    dirty, setDirty,
    editorOnInit,
    startRecording,
    stopRecording,
    audioElem,
    recordButton,
    secs,
    initTiny
  }
}