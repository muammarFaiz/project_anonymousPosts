import { useContext, useState } from "react"
import { Context } from "../../App"
import req from "../../axiosSetup"

const HomeLogic = () => {
  const [textarea, setTextarea] = useState('')
  const memory = useContext(Context)

  const postSecret = async () => {
    memory.setHomeLoading(true)
    const result = await req('postsecret', 'POST', { content: textarea })
    if (result === 'ok') {
      setTextarea('')
      memory.setHomepagePostSecret('secret posted')
    } else if(result === 'rejected') {
      alert('you are not logged in')
    } else {
      alert('failed to create post')
    }
    memory.setHomeLoading(false)
  }

  return {
    textarea, setTextarea,
    postSecret
  }
}
export default HomeLogic