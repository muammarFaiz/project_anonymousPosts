import { useState } from "react"
import { useDispatch } from "react-redux"
import req from "../../axiosSetup"
import { mainLoadingSwitch, setMessageContent, setShowChangeImg, setShowEditProfile, setUserinfo } from "../../reduxSlices/mainstates/mainstates"

export default function UserLogic() {
  const dispatch = useDispatch()
  const [bioUpdate, setBioUpdate] = useState('')
  const [bioContent, setBioContent] = useState('')

  const hideImgInput = e => {
    dispatch(setShowChangeImg(false))
    dispatch(setShowEditProfile(false))
  }

  const removeBubling = e => {
    if (e.stopPropagation) {
      e.stopPropagation()
    } else {
      e.cancelBubble = true
    }
  }

  const updateBio = (formerbio) => {
    console.log('updatin bio...')
    setBioContent(formerbio ? formerbio : '')
    setBioUpdate(true)
  }

  const saveBio = async (formerbio) => {
    if(bioContent.length > 400) {
      dispatch(setMessageContent({title: 'Rejected', description: 'content exceeded the limit'}))
    } else if(bioContent === formerbio) {
      // do nothing...
      setBioUpdate(false)
    } else {
      console.log('saving bio...')
      dispatch(mainLoadingSwitch())
      const result = await req('changebio', 'POST', {newbio: bioContent})
      if(result.error) dispatch(setMessageContent({ title: 'Failed to upload bio', description: result.error }))
      if(result === 'ok') {
        let result2 = await req('verifytoken', 'GET')
        if(result2.status === 'ok') {
          dispatch(setUserinfo(result2.userinfo))
        } else {
          dispatch(setMessageContent({title: 'Failed to get userdata', description: 'bio updated, but fail to get the new user data'}))
        }
      }
      dispatch(mainLoadingSwitch())
      setBioUpdate(false)
    }
  }

  const cancelBioUpdate = () => {
    setBioUpdate(false)
  }

  return {
    hideImgInput,
    removeBubling,
    updateBio,
    bioUpdate,
    saveBio,
    bioContent, setBioContent,
    cancelBioUpdate
  }
}