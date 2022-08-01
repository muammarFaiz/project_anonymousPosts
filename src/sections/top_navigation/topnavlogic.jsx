import req from "../../axiosSetup";
import { Context } from "../../App";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { setLoginStatus } from "../../reduxSlices/mainstates/mainstates";

export default function Topnavlogic() {
  const memory = useContext(Context)
  const mainLoading = useSelector(state => state.memory.mainLoading)
  const dispatch = useDispatch()

  const logout = async (val) => {
    const result = await req('logout', 'GET')
    console.log(result)
    if(result === 'token deleted' || result === 'token null') {
      // memory.setLoginStatus('')
      dispatch(setLoginStatus(''))
      memory.setUserImgSrc('')
      localStorage.removeItem('token')
      if(result === 'token null') alert('token null')
      alert('logout success')
    } else {
      console.log(result)
      alert('something is wrong')
    }
  }

  return {
    logout,
    mainLoading
  }
}