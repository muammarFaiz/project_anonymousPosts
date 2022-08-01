import InputSecretLogic from "./inputSecretLogic"
import { Editor } from "@tinymce/tinymce-react"
import { useDispatch } from "react-redux/es/exports"
import { decrement, increment, incByAmount } from "../../reduxSlices/counter/counterSlice"

import './inputSecretcss.css'

export default function InputSecret() {
  const logic = InputSecretLogic()
  const dispatch = useDispatch()

  console.log('inputsecret render');
  return (
    <div className="home-postsomething">
      <div className="postsomething-inputwrapper">
        <div className="editor-wrapper">
          <Editor
            apiKey="4mvv8o657gw9mtsftkdpcf8yxxev2hhxi5xref9juznrtv8g"
            onInit={logic.editorOnInit}
            onDirty={() => logic.setDirty(true)}
            init={{
              height: 250,
              width: 600,
              menu: {
                format: { title: 'Format', items: 'codeformat removeformat'}
              },
              menubar: 'view insert format',
              toolbar: 'undo redo | bold italic underline strikethrough subscript superscript codeformat blockquote | ' +
                'alignleft aligncenter alignjustify alignright alignnone'
            }}
          />
        </div>
        <div className="inputsecret-buttonswrapper">
        {
          logic.recordButton ?
            <button onClick={logic.startRecording}>Record audio</button> :
            <button onClick={logic.stopRecording}>Stop recording</button>
        }<br />
        {logic.audioElem}<br />
        <button onClick={() => dispatch(increment())}>increment</button>
        <button onClick={() => dispatch(decrement())}>decrement</button>
        <button onClick={() => dispatch(incByAmount(5))}>incBy5</button>
        <button className="inputsecret-postbutton" onClick={logic.postSecret} disabled={!logic.dirty}>Post</button>
        {/* reset the text editor if the user successfully post a secret/audio,
        also disable the post button because the texteditor and sound are empty,
        make the recorded sound deletable, also make the user able to re-record it */}
        </div>
      </div>
    </div>
  )
}