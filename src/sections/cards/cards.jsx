import './cardscss.css'
import cardsLogic from './cardsLogic'
import { AiOutlineArrowRight } from 'react-icons/ai'


export default function Cards({cardslocation}) {
  const logic = cardsLogic(cardslocation)

  return (
    <>
      <div className="cardwrap">
        {logic.c()}
      </div>
      <div className="nextpageWrap">
        <button onClick={() => logic.nextpage()}><AiOutlineArrowRight size={25} /></button>
      </div>
    </>
  )
}