import { useContext } from "react"
import { Context } from "../../App"

export default function UserLogic() {
  const memory = useContext(Context)

  const hideImgInput = e => {
    memory.setShowChangeImg(false)
    memory.setShowEditProfile(false)
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