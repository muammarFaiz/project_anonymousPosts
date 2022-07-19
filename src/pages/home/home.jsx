import Cards from "../../sections/cards/cards"
import InputSecret from "../../sections/inputSecret/inputSecret"

import './homecss.css'
// import HomeLogic from "./homelogic"

export default function Home() {
  // const logic = HomeLogic()

  return (
    <>
      <InputSecret />
      <Cards />
    </>
  )
}