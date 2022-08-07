import './popupmessagecss.css'
import popupmessagelogic from './popupmessagelogic'
import { useSelector } from 'react-redux'

export default function Popupmessage({title, description}) {
  const logic = popupmessagelogic()
  const messageContent = useSelector(state => state.memory.messageContent)

  if(messageContent) {
    return (
      <div className="popupmessage_blockingbackground">
        <div className="popupmessage">
          <div className="popupmessage_title">
            <h2>{messageContent.title}</h2>
          </div>
          <div className="popupmessage_description">
            <p>{messageContent.description}</p>
          </div>
          <button onClick={logic.done} autoFocus>Ok</button>
        </div>
      </div>
    )
  } else {
    return ''
  }
}