import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from 'react-icons/bs'
import { BsTrash, BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import { BiComment } from 'react-icons/bi'
import CardLogic from "./cardLogic"

import './cardcss.css'
import CommentSection from './comments/commentsection'

export default function Card(props) {
  const logic = CardLogic(props)
  
  return (
    <div className="card">
      <div className="card-userheader">
        {logic.showCreator()}
      </div>
      <div dangerouslySetInnerHTML={{__html: props.card.content}} className='card-secretContent'></div>
      {
        props.card.audio ?
        <audio src={logic.audioB64.current} controls></audio> : ''
      }
      <p className='card-createdDate'>Created date: {props.card.date_created}</p>
      <div className="card-control-flex">
        <div className="card-control-leftSide">
          <span onClick={() => logic.vote('up', props.card._id)} className='card-upvote'><BsFillArrowUpCircleFill color='#358C85' size={25} /></span>
          <span className='votesNumberSpan'>{logic.votes}</span>
          <span onClick={() => logic.vote('down', props.card._id)} className='card-downvote'><BsFillArrowDownCircleFill color='grey' size={20} /></span>
          {
            logic.userinfo._id ?
              <>
                <span onClick={() => logic.bookmarkIt(props.card._id)} className='card-bmButton'>{
                  logic.bookmarkStatus ? <BsBookmarkFill size={17} /> : <BsBookmark size={17} />
                }</span>
                <span className='card-commentButton' onClick={logic.showCommSectionSwitch}><BiComment size={20} /></span>
              </> : ''
          }
        </div>
        <div className="card-control-rightSide">
          {
            logic.showtrash() ?
            <button onClick={() => logic.deleteSecret(props.card.n)}>
              <BsTrash />
            </button> :
            ''
          }
        </div>
      </div>
      {logic.commSect ? <CommentSection id={props.card._id} /> : ''}
    </div>
  )
}