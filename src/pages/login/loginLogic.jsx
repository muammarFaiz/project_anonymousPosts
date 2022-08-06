import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Context } from "../../App";
import req from "../../axiosSetup";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { mainLoadingSwitch, setLoginStatus, setUserinfo } from "../../reduxSlices/mainstates/mainstates";

export default function LoginLogic() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  // const memory = useContext(Context)
  const dispatch = useDispatch()

  const formOnsubmit = async (val) => {
    val.preventDefault();
    // memory.setHomeLoading(true)
    dispatch(mainLoadingSwitch())
    try {
      const result = await req('login', 'POST', {email: email, password: password})
      if(result.token) {
        console.log('req login: success');
        localStorage.setItem('token', result.token)
        // memory.setLoginStatus('ok')
        dispatch(setLoginStatus('ok'))
        // memory.setUserinfo(result.userinfo)
        dispatch(setUserinfo(result.userinfo))
        navigate('/')
      } else {
        alert(`fail: ${result}`)
      }
      // memory.setHomeLoading(false)
      dispatch(mainLoadingSwitch())
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