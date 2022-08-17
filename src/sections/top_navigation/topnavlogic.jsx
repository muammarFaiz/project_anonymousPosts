import req from "../../axiosSetup";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { setLoginStatus, setShowauserinfo, setShowChangeImg, setShowEditProfile, setUserImgSrc, setUserinfo, showTopnavDropdownSwitch } from "../../reduxSlices/mainstates/mainstates";
import { useState } from "react";

export default function Topnavlogic() {
  const [gotopdisplay, setgotopdisplay] = useState('none')

  const dispatch = useDispatch()
  const mainLoading = useSelector(state => state.memory.mainLoading)

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

  window.onscroll = () => {
    const topscroll = document.documentElement.scrollTop
    if(topscroll >= 285) {
      if(gotopdisplay !== 'block') setgotopdisplay('block')
    } else {
      if(gotopdisplay !== 'none') setgotopdisplay('none')
    }
  }
  
  const gotophandler = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  return {
    logout,
    mainLoading,
    dropdownHandler,
    closeChangeUsernameAndImg,
    noPropagate,
    closeShowauserinfo,
    gotopdisplay,
    gotophandler
  }
}