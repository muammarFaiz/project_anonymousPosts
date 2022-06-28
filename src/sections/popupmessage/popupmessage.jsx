import './popupmessagecss.css'
import { useContext } from 'react'
import { Context } from '../../App'
import popupmessagelogic from './popupmessagelogic'

export default function Popupmessage({title, description}) {
  const logic = popupmessagelogic()
  const memory = useContext(Context)

  if(memory.popupmessageStatus) {
    return (
      <div className="popupmessage_blockingbackground">
        <div className="popupmessage">
          <div className="popupmessage_title">
            <h2>{memory.messageContent.title}</h2>
          </div>
          <div className="popupmessage_description">
            <p>{memory.messageContent.description}</p>
          </div>
          <button onClick={logic.done} autoFocus>Ok</button>
        </div>
      </div>
    )
  } else {
    return ''
  }
}