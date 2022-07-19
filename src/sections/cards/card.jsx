import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from 'react-icons/bs'
import { BsTrash } from 'react-icons/bs'
import CardLogic from "./cardLogic"

import './cardcss.css'

// create the delete functionality for profile page

export default function Card(props) {
  const logic = CardLogic(props)
  
  return (
    <div className="card">
      <div dangerouslySetInnerHTML={{__html: props.card.content}}></div>
      <p className='card-createdDate'>Created date: {props.card.date_created}</p>
      <div className="card-control-flex">
        <div className="card-control-leftSide">
          <span onClick={() => logic.vote('up', props.card._id)}><BsFillArrowUpCircleFill color='#8C2E81' size={25} /></span>
          <span className='votesNumberSpan'>{logic.votes}</span>
          <span onClick={() => logic.vote('down', props.card._id)}><BsFillArrowDownCircleFill color='#358C85' size={20} /></span>
        </div>
        <div className="card-control-rightSide">
          {
            props.profile ?
            <button onClick={() => logic.deleteSecret(props.card.n)}>
              <BsTrash />
            </button> :
            ''
          }
        </div>
      </div>
    </div>
  )
}