import { useEffect, useState } from "react";
import req from "./axiosSetup";

export default function AppLogic() {
  const [loginStatus, setLoginStatus] = useState('loading')
  const [popupmessageStatus, setPopupmessageStatus] = useState(false)
  const [messageContent, setMessageContent] = useState('')
  const [homeLoading, setHomeLoading] = useState('')
  const [profileLoading, setProfileLoading] = useState('')
  const [homepagePostSecret, setHomepagePostSecret] = useState('init')

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
  // it is working, now the problem will be how to disable all the button, anchor and input when message popup?
  
  return {
    loginStatus, setLoginStatus,
    popupmessageStatus, setPopupmessageStatus,
    messageContent, setMessageContent,
    homeLoading, setHomeLoading,
    profileLoading, setProfileLoading,
    homepagePostSecret, setHomepagePostSecret
  }
}