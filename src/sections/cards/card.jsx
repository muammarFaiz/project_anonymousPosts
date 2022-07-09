import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from 'react-icons/bs'
import CardLogic from "./cardLogic"

export default function Card(props) {
  const logic = CardLogic(props)
  
  return (
    <div className="card">
      <p>{props.card.content}</p>
      <p>Created date: {props.card.date_created}</p>
      <span onClick={() => logic.vote('up', props.card._id)}><BsFillArrowUpCircleFill /></span>
      <span className='votesNumberSpan'>{logic.votes}</span>
      <span onClick={() => logic.vote('down', props.card._id)}><BsFillArrowDownCircleFill /></span>
    </div>
  )
}