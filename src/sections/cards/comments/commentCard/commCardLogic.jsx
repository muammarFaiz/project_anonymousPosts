import { useEffect, useState } from "react"
import req from "../../../../axiosSetup"
import { useDispatch } from "react-redux/es/hooks/useDispatch"
import { setMessageContent, setRefreshCommSect, setShowauserinfo } from "../../../../reduxSlices/mainstates/mainstates"
import { useSelector } from "react-redux"

export default function CommCardLogic(props) {
  const [votes, setVotes] = useState('')
  const [loading, setLoading] = useState('')

  const dispatch = useDispatch()
  const userinfo = useSelector(state => state.memory.userinfo)
  const loginStatus = useSelector(state => state.memory.loginStatus)

  useEffect(() => {
    setVotes(props.comm.vote)
  }, [props.comm.vote])

  const upvote = async () => {
    setLoading(true)
    const result = await req('comment', 'POST', {update: 'up', commindex: props.commindex, secretid: props.secrid})
    if(result === 'ok') {
      setVotes(prev => prev + 1)
    } else if(result.error) {
      dispatch(setMessageContent({title: 'fail', description: result.error}))
    } else {
      alert('unkown failure, check your internet connection')
    }
    setLoading(false)
  }
  
  const downvote = async () => {
    setLoading(true)
    const result = await req('comment', 'POST', {update: 'down', commindex: props.commindex, secretid: props.secrid})
    if(result === 'ok') {
      setVotes(prev => prev - 1)
    } else if(result.error) {
      dispatch(setMessageContent({title: 'fail', description: result.error}))
    } else {
      alert('unkown failure, check your internet connection')
    }
    setLoading(false)
  }

  const delme = async () => {
    setLoading(true)
    const result = await req('comment', 'POST', {update: 'del', commindex: props.commindex, secretid: props.secrid})
    if(result === 'ok') {
      dispatch(setRefreshCommSect('comm deleted'))
    } else if(result.error) {
      dispatch(setMessageContent({title: 'fail', description: result.error}))
    } else {
      alert('unkown error fail to delete comment')
    }
    setLoading(false)
  }

  const getdatafromimg = (st) => {
    if(st === 'img') return `data:${props.img.profileImage.mimetype};base64,${props.img.profileImage.buffer}`
    if(st === 'name') return props.img.username
  }

  const isMyComm = () => userinfo._id === props.comm.creator

  const checkauser = () => {
    console.log('running checkauser')
    if (!loginStatus || loginStatus === 'rejected') {
      dispatch(setMessageContent({ title: 'rejected', description: 'you need to login' }))
    } else {
      dispatch(setShowauserinfo(props.comm.creator))
    }
  }

  return {
    upvote,
    votes,
    downvote,
    delme,
    loading,
    getdatafromimg,
    isMyComm,
    checkauser
  }
}