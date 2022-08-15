import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill, BsTrash } from 'react-icons/bs'
import CommCardLogic from './commCardLogic'
import './commCardCss.css'

export default function CommentCard(props) {
  // stoop doing the styling for now start creating the database and route
  const logic = CommCardLogic(props)

  return (
    <div className="commentCard-wrapper">
      <div className="creatorinfo-comment">
        <img src={logic.getdatafromimg('img')} alt="" onClick={logic.checkauser} />
        <div className="comment-wrappernameandcomment">
          <p onClick={logic.checkauser}>{logic.getdatafromimg('name')}</p>
          <p className="comment-content">{props.comm.content}</p>
        </div>
      </div>
      {logic.loading ? <p>Loading...</p> : ''}
      <div className="commentcontrol-wrapper">
        <div className="comment-updownvote-wrapper">
          <span className="upvote-comment" onClick={logic.upvote}><BsFillArrowUpCircleFill /></span>
          <span className="comment-votecount">{logic.votes}</span>
          <span className="downvote-comment" onClick={logic.downvote}><BsFillArrowDownCircleFill /></span>
        </div>
        <div className="comment-rightside-control">
        {logic.isMyComm() ? <span className="deletebutton-comment" onClick={logic.delme}><BsTrash /></span> : ''}
        </div>
      </div>
    </div>
  )
}