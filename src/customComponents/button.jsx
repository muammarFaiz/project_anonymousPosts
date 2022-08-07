import { useSelector } from "react-redux"

export default function ButtonMod(props) {
  const messageContent = useSelector(state => state.memory.messageContent)
  const disableOrNot = messageContent ? true : false

  const {disabled, specialButton, ...filtered} = props
  const disabledResult = specialButton ? disabled : disableOrNot
  return <button {...filtered} disabled={disabledResult}>{props.children}</button>
}