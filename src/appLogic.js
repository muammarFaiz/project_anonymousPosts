import { useEffect } from "react";
import req from "./axiosSetup";
import { useDispatch, useSelector } from "react-redux";
import { setCapslock, setLoginStatus, setUserImgSrc, setUserinfo } from "./reduxSlices/mainstates/mainstates";

export default function AppLogic() {
  // const [loginStatus, setLoginStatus] = useState('loading')
  // const [popupmessageStatus, setPopupmessageStatus] = useState(false)
  // const [messageContent, setMessageContent] = useState('')
  // const [homeLoading, setHomeLoading] = useState('')
  // const [deleteSecretN, setDeleteSecretN] = useState('')
  // const [poststatus, setpoststatus] = useState('')
  // const postSecretStatus = useRef(null)
  // const [capslock, setCapslock] = useState('')
  // const [userImgSrc, setUserImgSrc] = useState('')
  // const [userinfo, setUserinfo] = useState('')
  // const [showChangeImg, setShowChangeImg] = useState('')
  // const [showEditProfile, setShowEditProfile] = useState('')

  // state removed: popupmessageStatus

  const dispatch = useDispatch()
  // a simple change
  const loginStatus = useSelector(state => state.memory.loginStatus)

  useEffect( () => {
    const token = localStorage.getItem('token')
    if(token) {
      let result;
      async function fetchdata() {
        result = await req('verifytoken', 'GET', null)
        if(result.status === 'ok') {
          console.log('req verifytoken: token accepted');
          // setLoginStatus('ok')
          dispatch(setLoginStatus('ok'))
          // setUserinfo(result.userinfo)
          dispatch(setUserinfo(result.userinfo))
        } else {
          console.log('req verifytoken: token rejected');
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
    if(loginStatus === 'ok') {
      const getImgFromServer = async () => {
        const result = await req('userimage', 'GET')
        console.log('req userimage: img received');
        // setUserImgSrc('data:' + result.mimetype + ';base64,' + result.base64)
        dispatch(setUserImgSrc('data:' + result.mimetype + ';base64,' + result.base64))
      }
      getImgFromServer()
    }
  }, [loginStatus, dispatch])

  // useEffect(() => {
  //   if(messageContent !== '') {
  //     console.log('message useeffect run');
  //     // setPopupmessageStatus(true)
  //     dispatch(popupmessageStatusSwitch())
  //   }
  // }, [messageContent, dispatch])
  
  const capsPressed = (v) => {
    console.log('capsPressed func running');
    const capsStatus = v.getModifierState('CapsLock')
    if(capsStatus) {
      // if(!capslock) {
      //   setCapslock(true)
      // }
      dispatch(setCapslock(true))
    } else {
      // if(capslock) {
      //   setCapslock(false)
      // }
      dispatch(setCapslock(false))
    }
  }

  return {
    // loginStatus, setLoginStatus,
    // popupmessageStatus, setPopupmessageStatus,
    // messageContent, setMessageContent,
    // homeLoading, setHomeLoading,
    // deleteSecretN, setDeleteSecretN,
    // homepagePostSecret, setHomepagePostSecret,
    // postSecretStatus,
    // capslock,
    capsPressed,
    // userImgSrc, setUserImgSrc,
    // userinfo, setUserinfo,
    // showChangeImg, setShowChangeImg,
    // poststatus, setpoststatus,
    // showEditProfile, setShowEditProfile
  }
}