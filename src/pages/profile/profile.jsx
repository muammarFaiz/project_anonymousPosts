import Button from '../../customComponents/button'
import Card from '../../sections/cards/card'
import ProfileLogic from './profilelogic'

import './profilecss.css'

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
      <div className="createPost">
        <div className="createpost-inputwrapper">
          <textarea cols="30" rows="6" onChange={logic.editTextarea} value={logic.textarea}></textarea>
          <Button className="createPost_button" onClick={logic.createPost}>Post</Button>
        </div>
      </div>
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