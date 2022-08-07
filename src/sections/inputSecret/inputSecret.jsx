import InputSecretLogic from "./inputSecretLogic"
import { Editor } from "@tinymce/tinymce-react"

import './inputSecretcss.css'

export default function InputSecret() {
  const logic = InputSecretLogic()

  return (
    <div className="home-postsomething">
      <div className="postsomething-inputwrapper">
        <div className="editor-wrapper">
          <Editor
            apiKey={process.env.REACT_APP_TINYMCE_APIKEY}
            onInit={logic.editorOnInit}
            onDirty={() => logic.setDirty(true)}
            init={logic.initTiny()}
          />
        </div>
        <div className="inputsecret-buttonswrapper">
        {
          logic.recordButton ?
            <button onClick={logic.startRecording}>Record audio</button> :
            <>
              <button onClick={logic.stopRecording}>Stop recording</button>
              <p>{logic.secs}</p>
            </>
        }
        <br />
        {logic.audioElem}<br />
        <button className="inputsecret-postbutton" onClick={logic.postSecret} disabled={!logic.dirty}>Post</button>
        {/* reset the text editor if the user successfully post a secret/audio,
        also disable the post button because the texteditor and sound are empty,
        make the recorded sound deletable, also make the user able to re-record it */}
        </div>
      </div>
    </div>
  )
}