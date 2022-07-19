import Card from '../../sections/cards/card'
import ProfileLogic from './profilelogic'

import './profilecss.css'
import InputSecret from '../../sections/inputSecret/inputSecret'

export default function Profile() {
  const logic = ProfileLogic()

  const posts = () => {
    if(logic.loading) {
      return <h1>Loading...</h1>
    } else if(logic.secretArr.length < 1) {
      return <p>no secret found...</p>
    } else {
      let examplePostArr = []
      for(let i = 0; i < logic.secretArr.length; i++) {
        const secret = logic.secretArr[i]
        examplePostArr.push(
          <Card card={secret} key={i} profile={true} />
        )
      }
      return examplePostArr
    }
  }
  
  return (
    <div className="profile">
      <InputSecret />
      <div className="yourposts">
        <div className="cardwrap">
          {posts()}
        </div>
      </div>
      <div className='profilePaginationWrap'>
        {logic.setPageGroup()}
      </div>
    </div>
  )
}