import { useRef } from "react"
import { useContext, useState } from "react"
import { Context } from "../../App";
import req from "../../axiosSetup";


export default function InputSecretLogic() {
  const memory = useContext(Context)
  const editorRef = useRef(null);
  const [dirty, setDirty] = useState(false)
  
  const postSecret = async () => {
    memory.setHomeLoading(true)
    if (editorRef.current) {
      const content = editorRef.current.getContent()
      console.log(content);
      const result = await req('postsecret', 'POST', { content: content })
      if (result === 'ok') {
        memory.setHomepagePostSecret('secret posted')
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
    memory.setHomeLoading(false)
  }

  const editorOnInit = (evt, editor) => editorRef.current = editor

  return {
    postSecret,
    dirty, setDirty,
    editorOnInit
  }
}