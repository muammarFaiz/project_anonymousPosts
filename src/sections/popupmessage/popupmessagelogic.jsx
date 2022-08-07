import { useDispatch } from "react-redux"
import { setMessageContent } from "../../reduxSlices/mainstates/mainstates"

export default function Popupmessagelogic() {
  const dispatch = useDispatch()

  const done = () => {
    dispatch(setMessageContent(false))
  }

  return {
    done
  }
}