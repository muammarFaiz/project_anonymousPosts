import req from "../../axiosSetup";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { setLoginStatus, setShowauserinfo, setShowChangeImg, setShowEditProfile, setUserImgSrc, setUserinfo, showTopnavDropdownSwitch } from "../../reduxSlices/mainstates/mainstates";

export default function Topnavlogic() {
  const mainLoading = useSelector(state => state.memory.mainLoading)
  const dispatch = useDispatch()

  const logout = async (val) => {
    const result = await req('logout', 'GET')
    if(result === 'token deleted' || result === 'token null') {
      dispatch(setLoginStatus(''))
      dispatch(setUserImgSrc(''))
      dispatch(setUserinfo(''))
      localStorage.removeItem('token')
      if(result === 'token null') alert('token null')
      alert('logout success')
    } else {
      console.log(result)
      alert('something is wrong')
    }
  }

  const dropdownHandler = () => {
    dispatch(showTopnavDropdownSwitch())
  }

  const closeChangeUsernameAndImg = (changeimg) => {
    if(changeimg) {
      dispatch(setShowChangeImg(false))
    } else {
      dispatch(setShowEditProfile(false))
    }
  }

  const noPropagate = (e) => {
    e.stopPropagation()
  }

  const closeShowauserinfo = () => {
    dispatch(setShowauserinfo(false))
  }

  return {
    logout,
    mainLoading,
    dropdownHandler,
    closeChangeUsernameAndImg,
    noPropagate,
    closeShowauserinfo
  }
}