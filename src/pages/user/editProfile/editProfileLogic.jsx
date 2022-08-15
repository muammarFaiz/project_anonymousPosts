import { useRef } from "react"
import { useState } from "react"
import req from "../../../axiosSetup"
import { useDispatch } from "react-redux/es/exports"
import { setLoginStatus, setShowEditProfile, setUserinfo } from "../../../reduxSlices/mainstates/mainstates"
import { useEffect } from "react"

export default function EditProfileLogic() {
  const [editProfileLoading, setEditProfileLoading] = useState('')
  const inputElem = useRef(null)
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
      const result2 = await req('verifytoken', 'GET', null)
      if(result2.status === 'ok') {
        dispatch(setUserinfo(result2.userinfo))
        inputElem.current.value = ''
      } else {
        alert('token rejected')
        dispatch(setLoginStatus('rejected'))
      }
      alert(result.status)
    }
    setEditProfileLoading(false)
  }

  useEffect(() => {
    inputElem.current.focus()
  }, [])

  const exit = (e) => {
    if(e.key === 'Escape') dispatch(setShowEditProfile(false))
  }

  return {
    changeUsername,
    editProfileLoading,
    inputElem,
    exit
  }
}