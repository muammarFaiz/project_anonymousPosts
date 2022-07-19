import InputSecretLogic from "./inputSecretLogic"
import { Editor } from "@tinymce/tinymce-react"

import './inputSecretcss.css'

export default function InputSecret() {
  const logic = InputSecretLogic()

  return (
    <div className="home-postsomething">
      <div className="postsomething-inputwrapper">
        <Editor
          apiKey="4mvv8o657gw9mtsftkdpcf8yxxev2hhxi5xref9juznrtv8g"
          onInit={logic.editorOnInit}
          onDirty={() => logic.setDirty(true)}
          init={{
            height: 250,
            width: 600
          }}
        />
        <button onClick={logic.postSecret} disabled={!logic.dirty}>Post</button>
      </div>
    </div>
  )
}