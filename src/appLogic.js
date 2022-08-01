import { useEffect, useRef, useState } from "react";
import req from "./axiosSetup";
import { useDispatch, useSelector } from "react-redux";
import { setLoginStatus } from "./reduxSlices/mainstates/mainstates";

export default function AppLogic() {
  // const [loginStatus, setLoginStatus] = useState('loading')
  const [popupmessageStatus, setPopupmessageStatus] = useState(false)
  const [messageContent, setMessageContent] = useState('')
  // const [homeLoading, setHomeLoading] = useState('')
  const [deleteSecretN, setDeleteSecretN] = useState('')
  const [poststatus, setpoststatus] = useState('')
  const postSecretStatus = useRef(null)
  const [capslock, setCapslock] = useState('')
  const [userImgSrc, setUserImgSrc] = useState('')
  const [userinfo, setUserinfo] = useState('')
  const [showChangeImg, setShowChangeImg] = useState('')
  const [showEditProfile, setShowEditProfile] = useState('')

  // state migration to redux done: homeLoading, loginStatus

  const dispatch = useDispatch()
  const loginStatus = useSelector(state => state.memory.loginStatus)

  const getImgFromServer = async () => {
    const result = await req('userimage', 'GET')
    console.log('img received');
    setUserImgSrc('data:' + result.mimetype + ';base64,' + result.base64)
  }
  useEffect( () => {
    const token = localStorage.getItem('token')
    if(token) {
      let result;
      async function fetchdata() {
        result = await req('verifytoken', 'GET', null)
        if(result.status === 'ok') {
          console.log('token accepted');
          // setLoginStatus('ok')
          dispatch(setLoginStatus('ok'))
          setUserinfo(result.userinfo)
        } else {
          console.log('token rejected');
          // setLoginStatus('rejected')
          dispatch(setLoginStatus('rejected'))
        }
      }
      fetchdata()
    } else {
      console.log('user does not have token');
      // setLoginStatus('rejected')
      dispatch(setLoginStatus('rejected'))
    }
  }, [dispatch])

  useEffect(() => {
    if(loginStatus === 'ok') getImgFromServer()
  }, [loginStatus])

  useEffect(() => {
    if(messageContent !== '') {
      console.log('message useeffect run');
      setPopupmessageStatus(true)
    }
  }, [messageContent])
  
  const capsPressed = (v) => {
    const capsStatus = v.getModifierState('CapsLock')
    if(capsStatus) {
      if(!capslock) {
        setCapslock(true)
      }
    } else {
      if(capslock) {
        setCapslock(false)
      }
    }
  }

  return {
    // loginStatus, setLoginStatus,
    popupmessageStatus, setPopupmessageStatus,
    messageContent, setMessageContent,
    // homeLoading, setHomeLoading,
    deleteSecretN, setDeleteSecretN,
    // homepagePostSecret, setHomepagePostSecret,
    postSecretStatus,
    capslock,
    capsPressed,
    userImgSrc, setUserImgSrc,
    userinfo, setUserinfo,
    showChangeImg, setShowChangeImg,
    poststatus, setpoststatus,
    showEditProfile, setShowEditProfile
  }
}