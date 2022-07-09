import { memo, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
import req from "../../axiosSetup";

export default function LoginLogic() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const memory = useContext(Context)

  const formOnsubmit = async (val) => {
    val.preventDefault();
    memory.setHomeLoading(true)
    try {
      const result = await req('login', 'POST', {email: email, password: password})
      if(result.token) {
        localStorage.setItem('token', result.token)
        memory.setLoginStatus('ok')
        navigate('/')
      } else {
        alert(`fail: ${result}`)
      }
      memory.setHomeLoading(false)
    } catch (error) {
      console.log('error....');
    }
  }

  const setEmailInput = (val) => {
    setEmail(val.target.value)
  }

  const setPasswordInput = (val) => {
    setPassword(val.target.value)
  }
  
  return {
    formOnsubmit,
    email, setEmailInput,
    password, setPasswordInput
  }
}