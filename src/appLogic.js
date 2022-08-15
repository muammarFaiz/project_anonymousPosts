import { useEffect } from "react";
import req from "./axiosSetup";
import { useDispatch, useSelector } from "react-redux";
import { setCapslock, setLoginStatus, setUserImgSrc, setUserinfo } from "./reduxSlices/mainstates/mainstates";

export default function AppLogic() {
  const dispatch = useDispatch()
  const loginStatus = useSelector(state => state.memory.loginStatus)

  useEffect( () => {
    const token = localStorage.getItem('token')
    if(token) {
      let result;
      async function fetchdata() {
        result = await req('verifytoken', 'GET', null)
        if(result.status === 'ok') {
          dispatch(setLoginStatus('ok'))
          dispatch(setUserinfo(result.userinfo))
        } else {
          dispatch(setLoginStatus('rejected'))
        }
      }
      fetchdata()
    } else {
      dispatch(setLoginStatus('rejected'))
    }
  }, [dispatch])

  useEffect(() => {
    if(loginStatus === 'ok') {
      const getImgFromServer = async () => {
        const result = await req('userimage', 'GET')
        dispatch(setUserImgSrc('data:' + result.mimetype + ';base64,' + result.base64))
      }
      getImgFromServer()
    }
  }, [loginStatus, dispatch])

  const capsPressed = (v) => {
    const capsStatus = v.getModifierState('CapsLock')
    if(capsStatus) {
      dispatch(setCapslock(true))
    } else {
      dispatch(setCapslock(false))
    }
  }

  const getimgname = async (arr) => {
    console.log(arr)
    let ids = []
    arr.forEach(obj => {
      if(obj.creatorId) {
        if(!ids.includes(obj.creatorId)) ids.push(obj.creatorId)
      } else if(obj.creator) {
        if(!ids.includes(obj.creator)) ids.push(obj.creator)
      }
    });
    console.log(ids)
    const result = await req('getimgname', 'POST', {idarr: ids})
    return result
  }

  return {
    capsPressed,
    getimgname
  }
}