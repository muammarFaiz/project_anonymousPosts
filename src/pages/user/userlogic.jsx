// import { useContext } from "react"
import { useDispatch } from "react-redux"
// import { Context } from "../../App"
import { setShowChangeImg, setShowEditProfile } from "../../reduxSlices/mainstates/mainstates"

export default function UserLogic() {
  // const memory = useContext(Context)
  const dispatch = useDispatch()

  const hideImgInput = e => {
    // memory.setShowChangeImg(false)
    dispatch(setShowChangeImg(false))
    // memory.setShowEditProfile(false)
    dispatch(setShowEditProfile(false))
  }

  const removeBubling = e => {
    if (e.stopPropagation) {
      e.stopPropagation()
    } else {
      e.cancelBubble = true
    }
  }

  return {
    hideImgInput,
    removeBubling
  }
}