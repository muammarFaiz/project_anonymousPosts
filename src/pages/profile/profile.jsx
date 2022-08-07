import ProfileLogic from './profilelogic'

import './profilecss.css'
import InputSecret from '../../sections/inputSecret/inputSecret'

export default function Profile() {
  const logic = ProfileLogic()
  return (
    <div className="profile">
      <InputSecret />
      <div className="yourposts">
        <div className="cardwrap">
          {logic.cardsForProfile()}
        </div>
      </div>
      <div className='profilePaginationWrap'>
        {logic.setPageGroup()}
      </div>
    </div>
  )
}