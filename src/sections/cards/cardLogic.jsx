import { useRef } from "react";
import { useEffect, useState } from "react";
import req from "../../axiosSetup";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import {useSelector} from 'react-redux'
import { mainLoadingSwitch, setDeleteSecretN, setMessageContent, setShowauserinfo } from "../../reduxSlices/mainstates/mainstates";
import {useNavigate} from 'react-router-dom'

export default function CardLogic(props) {
  const [votes, setVotes] = useState('')
  const [bookmarkStatus, setBookmarkStatus] = useState('')
  const [commSect, setCommSect] = useState('')
  const audioB64 = useRef(null)
  const [creatorImg, setCreatorImg] = useState('')
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userinfo = useSelector(state => state.memory.userinfo)
  const userImgSrc = useSelector(state => state.memory.userImgSrc)
  const loginStatus = useSelector(state => state.memory.loginStatus)
  

  useEffect(() => {
    if (props.card.vote_count === undefined || props.card.vote_count === 'init') {
      setVotes(0)
    } else {
      setVotes(parseInt(props.card.vote_count, 10))
    }
    if(props.card.audio) arrBuffToUrlObj(props.card.audio.buffer, props.card.audio.mimetype)
  }, [props.card.vote_count, props.card.audio])

  const vote = async (action, id) => {
    dispatch(mainLoadingSwitch())
    const result = await req('vote', 'GET', undefined, { status: action, id: id })
    if (result !== 'ok') {
      alert('fail to vote')
    } else {
      setVotes(prev => {
        let n = prev + 0
        if(action === 'up') {
          n++
        } else {
          n = n - 1
        }
        return n
      })
    }
    dispatch(mainLoadingSwitch())
  }

  const deleteSecret = async (n) => {
    dispatch(setDeleteSecretN(n))
  }

  const arrBuffToUrlObj = (ab, mime) => {
    audioB64.current = `data:${mime};base64,${ab}`
  }

  const bookmarkIt = async (secretid) => {
    let result
    dispatch(mainLoadingSwitch())
    if(!bookmarkStatus) {
      result = await req('bookmarksecret', 'POST', {secretid: secretid})
      if (result === 'ok') setBookmarkStatus(true)
    } else {
      result = await req('removebookmark', 'POST', {secretid: secretid})
      if(result === 'ok') setBookmarkStatus(false)
    }
    if(result.error) alert(result.error)
    dispatch(mainLoadingSwitch())
  }

  useEffect(() => {
    // console.log('useeffect cardlogic bookmark running...')
    if(userinfo._id) {
      if(props.card.bookmarkedBy) {
        if(props.card.bookmarkedBy.find(id => id === userinfo._id)) {
          // console.log('bookmark is true')
          setBookmarkStatus(true)
        }
      }
    }
  }, [props.card.bookmarkedBy, userinfo._id])

  const showtrash = () => {
    return props.card.creatorId === userinfo._id
  }

  const showCommSectionSwitch = () => {
    setCommSect(prev => prev ? false : true)
  }

  const checkauser = () => {
    if(!loginStatus || loginStatus === 'rejected') {
      dispatch(setMessageContent({title: 'rejected', description: 'you need to login'}))
    } else {
      dispatch(setShowauserinfo(props.card.creatorId))
    }
  }
  
  const getimg = (st, userinfoarr) => {
    const imgarr = userinfoarr.find(obj => obj._id === props.card.creatorId)
    if(st === 'img') {
      const buff = imgarr.profileImage.buffer
      // const base64img = buff.data.toString('base64')
      // console.log(base64img)
      return `data:${imgarr.profileImage.mimetype};base64,${buff}`
    }
    // if(st === 'img') return 'fail'
    if(st === 'name') return imgarr.username
    // if(st === 'name') return 'fail'
  }

  const showCreator = () => {
    if(props.card.creatorId === userinfo._id) {
      return (<>
        <img src={userImgSrc} alt="" onClick={() => navigate('/user')} />
        <p onClick={() => navigate('/user')}>{userinfo.username}</p>
      </>)
    } else if(!creatorImg) {
      return <p>Loading...</p>
    } else {
      return (<>
        <img src={getimg('img', creatorImg)} alt="" onClick={checkauser} />
        <p onClick={checkauser}>{getimg('name', creatorImg)}</p>
      </>)
    }
  }

  useEffect(() => {
    // console.log('get image is running')
    const runme = async () => {
      const result = await req('getimgname', 'POST', { idarr: [props.card.creatorId] })
      setCreatorImg(result)
      // console.log(result)
    }
    runme()
  }, [props.card.creatorId])

  return {
    vote,
    votes, setVotes,
    deleteSecret,
    audioB64,
    bookmarkIt,
    bookmarkStatus,
    userinfo,
    showtrash,
    showCommSectionSwitch,
    commSect,
    getimg,
    showCreator
  }
}