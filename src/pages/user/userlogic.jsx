
import { useDispatch } from "react-redux"
import { setShowChangeImg, setShowEditProfile } from "../../reduxSlices/mainstates/mainstates"

export default function UserLogic() {
  const dispatch = useDispatch()

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

  return {
    hideImgInput,
    removeBubling
  }
}