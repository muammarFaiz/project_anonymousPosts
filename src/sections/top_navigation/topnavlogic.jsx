import req from "../../axiosSetup";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { setLoginStatus, setUserImgSrc } from "../../reduxSlices/mainstates/mainstates";

export default function Topnavlogic() {
  const mainLoading = useSelector(state => state.memory.mainLoading)
  const dispatch = useDispatch()

  const logout = async (val) => {
    const result = await req('logout', 'GET')
    if(result === 'token deleted' || result === 'token null') {
      dispatch(setLoginStatus(''))
      dispatch(setUserImgSrc(''))
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