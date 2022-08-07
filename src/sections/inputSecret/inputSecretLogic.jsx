import { useRef } from "react"
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
      const result = await req('postsecret', 'POST', {
        content: content, audiobuffer: audioBlob
      }, undefined, 'multipart/form-data')
      if (result === 'ok') {
        dispatch(setPoststatus('secret posted'))
        setDirty(false)
        editorRef.current.setDirty(false)

      } else if (result === 'rejected') {
        alert('you are not logged in')
      } else if(result.error) {
        alert(result.error.errors[0].msg)
      } else {
        alert('failed to create post')
      }
    } else {
      alert('editor is not loaded')
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
        dispatch(mainLoadingSwitch())
        setRecordButton(true)
      }
      audioMediaRecorder.start()
      audioRecorder.current = audioMediaRecorder
      setRecordButton(false)
    })
  }
  const stopRecording = () => {
    audioRecorder.current.stop()
  }

  const removeCurrentAudio = () => {
    setAudioElem('')
    audioChunks.current = []
  }

  return {
    postSecret,
    dirty, setDirty,
    editorOnInit,
    startRecording,
    stopRecording,
    audioElem,
    recordButton
  }
}