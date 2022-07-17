import Cards from "../../sections/cards/cards"

import './homecss.css'
import HomeLogic from "./homelogic"

export default function Home() {
  const logic = HomeLogic()

  return (
    <>
      <div className="home-postsomething">
        <div className="postsomething-inputwrapper">
          <textarea name="" id="" cols="30" rows="6" value={logic.textarea} onChange={
            val => logic.setTextarea(val.target.value)
          }></textarea><br />
          <button onClick={logic.postSecret}>Post</button>
        </div>
      </div>
      <Cards />
    </>
  )
}