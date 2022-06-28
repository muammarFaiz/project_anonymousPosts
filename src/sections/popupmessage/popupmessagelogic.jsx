import { useContext } from "react"
import { Context } from "../../App"

export default function Popupmessagelogic() {
  const memory = useContext(Context)
  const done = () => {
    memory.setPopupmessageStatus(false)
  }

  return {
    done
  }
}