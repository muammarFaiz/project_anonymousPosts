import { useRef } from "react"
import { useContext } from "react"
import { useState } from "react"
import { Context } from "../../../App"
import req from "../../../axiosSetup"

export default function EditProfileLogic() {
  const [editProfileLoading, setEditProfileLoading] = useState('')
  const inputElem = useRef(null)
  const memory = useContext(Context)

  const changeUsername = async () => {
    const newName = inputElem.current.value
    if(!newName) {
      setEditProfileLoading('username cannot empty')
      return
    }
    setEditProfileLoading('loading...')
    const result = await req('changeusername', 'POST', {newusername: inputElem.current.value})
    if(result.status === 'ok') {
      const result2 = await req('verifytoken', 'GET', null)
      if(result2.status === 'ok') {
        memory.setUserinfo(result2.userinfo)
        inputElem.current.value = ''
      } else {
        alert('token rejected')
        memory.setLoginStatus('rejected')
      }
      alert(result.status)
    }
    setEditProfileLoading(false)
  }
  return {
    changeUsername,
    editProfileLoading,
    inputElem
  }
}