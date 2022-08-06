// import { useContext } from "react"
// import { Context } from "../../App"
import { useDispatch } from "react-redux"
import { setMessageContent } from "../../reduxSlices/mainstates/mainstates"

export default function Popupmessagelogic() {
  // const memory = useContext(Context)
  const dispatch = useDispatch()

  const done = () => {
    // memory.setPopupmessageStatus(false)
    dispatch(setMessageContent(false))
  }

  return {
    done
  }
}