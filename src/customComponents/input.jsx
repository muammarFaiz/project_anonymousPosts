import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setCapslock } from "../reduxSlices/mainstates/mainstates"

export default function InputMod(props) {
  const messageContent = useSelector(state => state.memory.messageContent)
  const disableOrNot = messageContent ? true : false
  const dispatch = useDispatch()

  const capsOnkeydown = v => {
    const capsState = v.getModifierState('CapsLock')
    if(capsState) {
      dispatch(setCapslock(true))
    } else {
      dispatch(setCapslock(false))
    }
  }

  const {disabled, specialInput, ...filtered} = props
  const disabledResult = specialInput ? disabled : disableOrNot

  return <input {...filtered} disabled={disabledResult} onKeyDown={capsOnkeydown} />
}