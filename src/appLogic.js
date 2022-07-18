import { useEffect, useState } from "react";
import req from "./axiosSetup";

export default function AppLogic() {
  const [loginStatus, setLoginStatus] = useState('loading')
  const [popupmessageStatus, setPopupmessageStatus] = useState(false)
  const [messageContent, setMessageContent] = useState('')
  const [homeLoading, setHomeLoading] = useState('')
  const [profileLoading, setProfileLoading] = useState('')
  const [homepagePostSecret, setHomepagePostSecret] = useState('init')
  const [capslock, setCapslock] = useState('')

  useEffect( () => {
    console.log('useeffect for verifytoken is running');
    const token = localStorage.getItem('token')
    if(token) {
      let result;
      async function fetchdata() {
        result = await req('verifytoken', 'GET', null)
        if(result === 'ok') {
          console.log('token accepted');
          setLoginStatus('ok')
        } else {
          console.log('token rejected');
          setLoginStatus('rejected')
        }
      }
      fetchdata()
    } else {
      console.log('user does not have token');
      setLoginStatus('rejected')
    }
  }, [])

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
    loginStatus, setLoginStatus,
    popupmessageStatus, setPopupmessageStatus,
    messageContent, setMessageContent,
    homeLoading, setHomeLoading,
    profileLoading, setProfileLoading,
    homepagePostSecret, setHomepagePostSecret,
    capslock,
    capsPressed
  }
}