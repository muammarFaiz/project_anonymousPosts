import { useRef } from "react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import req from "../../axiosSetup"
import { setMessageContent, setShowauserinfo } from "../../reduxSlices/mainstates/mainstates"

export default function UserinfoFloatLogic() {
  const [loading, setLoading] = useState('init')
  const [userpublicinfo, setUserpublicinfo] = useState('')
  const okbutton = useRef()

  const dispatch = useDispatch()
  const showauserinfo = useSelector(state => state.memory.showauserinfo)

  useEffect(() => {
    const getUserinfoPublic = async () => {
      setLoading(true)
      const result = await req('userinfopublic', 'POST', { userid: showauserinfo })
      console.log(result)
      if (result.error) {
        dispatch(setMessageContent({ title: 'fail', description: result.error }))
      } else {
        setUserpublicinfo(result)
      }
      setLoading(false)
      okbutton.current.focus()
    }
    getUserinfoPublic()
  }, [dispatch, showauserinfo])

  const closeMe = () => {
    dispatch(setShowauserinfo(false))
  }

  return {
    loading,
    userpublicinfo,
    closeMe,
    okbutton
  }
}