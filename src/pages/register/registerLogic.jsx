import { useState } from "react";
import { useNavigate } from "react-router-dom";
import req from "../../axiosSetup";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { mainLoadingSwitch, setMessageContent } from "../../reduxSlices/mainstates/mainstates";

export default function RegisterLogic() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const usernameEdit = (val) => {
    setUsername(val.target.value)
  }
  const emailEdit = (val) => {
    setEmail(val.target.value)
  }
  const passwordEdit = (val) => {
    setPassword(val.target.value)
  }

  const formOnsubmit = async (val) => {
    val.preventDefault();
    dispatch(mainLoadingSwitch())
    let result
    try {
      result = await req('register', 'POST', {
        username: username,
        email: email,
        password: password
      })
      if(result === 'ok') {
        navigate('/login')
      } else {
        dispatch(setMessageContent({
          title: `value: ${result.errors[0].value}`,
          description: result.errors[0].msg
        }))
      }
      dispatch(mainLoadingSwitch())
    } catch (error) {
      console.log(error);
      alert(error.message)
    }
  }

  return {
    username, usernameEdit,
    email, emailEdit,
    password, passwordEdit,
    formOnsubmit
  }
}