import { useContext } from "react"
import { Context } from "../App"

export default function Button(props) {
  const memory = useContext(Context)
  const {disabled, ...filtered} = props
  const disabledResult = props.specialButton ? disabled : memory.popupmessageStatus
  return <button {...filtered} disabled={disabledResult}>{props.children}</button>
}