import CommentCard from "./commentCard/commentCard"
import CommSectLogic from "./commentsectlogic"
import './commSectCss.css'

export default function CommentSection(props) {
  const logic = CommSectLogic(props)

  return (
    <div className="commentsection-wrapper">
      <textarea cols="30" rows="2" className="addcomment-input" onChange={logic.inputHandler} value={logic.input1}></textarea>
      <button onClick={logic.sendComm}>Send</button>
      {logic.loading || logic.refreshCommSect === 'comm deleted' ? <p>Loading...</p> : ''}
      <div className="commentsection-cardwrapper">
        {
          logic.commArr.map((c, i) => <CommentCard comm={c} key={i} secrid={props.id} commindex={i} img={logic.getimgobj(c.creator)} />)
        }
      </div>
    </div>
  )
}