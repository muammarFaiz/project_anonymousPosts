import './cardscss.css'
import cardsLogic from './cardsLogic'
import { AiOutlineArrowRight } from 'react-icons/ai'
import Card from './card'

export default function Cards() {
  const logic = cardsLogic()

  const c = () => {
    let arr = []
    if(logic.homeCards.length === 0) {
      arr.push(<h1 key={0}>Loadinggg...</h1>)
    } else {
      for(let i = 0; i < logic.homeCards.length; i++) {
        const card = logic.homeCards[i]
        arr.push(
          <Card card={card} key={i} />
        )
      }
    }
    return arr
  }
  return (
    <>
      <div className="cardwrap">
        {c()}
      </div>
      <div className="nextpageWrap">
        <button onClick={() => logic.setNextpage('next')}><AiOutlineArrowRight /></button>
      </div>
    </>
  )
}