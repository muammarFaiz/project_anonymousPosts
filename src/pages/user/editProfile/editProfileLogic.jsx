import { useRef } from "react"
// import { useContext } from "react"
import { useState } from "react"
// import { Context } from "../../../App"
import req from "../../../axiosSetup"
import { useDispatch } from "react-redux/es/exports"
import { setLoginStatus, setUserinfo } from "../../../reduxSlices/mainstates/mainstates"

export default function EditProfileLogic() {
  const [editProfileLoading, setEditProfileLoading] = useState('')
  const inputElem = useRef(null)
  // const memory = useContext(Context)
  const dispatch = useDispatch()

  const changeUsername = async () => {
    const newName = inputElem.current.value
    if(!newName) {
      setEditProfileLoading('username cannot empty')
      return
    }
    setEditProfileLoading('loading...')
    const result = await req('changeusername', 'POST', {newusername: inputElem.current.value})
    if(result.status === 'ok') {
      console.log('req changeusername: success');
      const result2 = await req('verifytoken', 'GET', null)
      if(result2.status === 'ok') {
        console.log('req verifytoken: status ok')
        // memory.setUserinfo(result2.userinfo)
        dispatch(setUserinfo(result2.userinfo))
        inputElem.current.value = ''
      } else {
        alert('token rejected')
        // memory.setLoginStatus('rejected')
        dispatch(setLoginStatus('rejected'))
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