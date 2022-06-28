import { useContext } from "react"
import { Context } from "../App"

export default function Input(props) {
  const memory = useContext(Context)
  const {disabled, ...filtered} = props
  const disabledResult = props.specialInput ? disabled : memory.popupmessageStatus

  return <input {...filtered} disabled={disabledResult} />
}