import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
import req from "../../axiosSetup";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { mainLoadingSwitch } from "../../reduxSlices/mainstates/mainstates";

export default function RegisterLogic() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const memory = useContext(Context)
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
    // memory.setHomeLoading(true)
    dispatch(mainLoadingSwitch())
    let result
    try {
      result = await req('register', 'POST', {
        username: username,
        email: email,
        password: password
      })
      console.log(result)
      if(result === 'ok') {
        navigate('/login')
      } else {
        memory.setMessageContent({
          title: `value: ${result.errors[0].value}`,
          description: result.errors[0].msg
        })
      }
      // memory.setHomeLoading(false)
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