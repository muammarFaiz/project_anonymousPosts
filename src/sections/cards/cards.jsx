import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from 'react-icons/bs'
import './cardscss.css'

export default function Cards() {

  const c = () => {
    let arr = []
    for(let i = 0; i < 30; i++) {
      arr.push(
        <div className="card" key={i}>
          <p>hello world, Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, quae.</p>
          <span><BsFillArrowUpCircleFill /></span><span><BsFillArrowDownCircleFill /></span>
        </div>
      )
    }
    return arr
  }
  return (
    <div className="cardwrap">
      {c()}
    </div>
  )
}