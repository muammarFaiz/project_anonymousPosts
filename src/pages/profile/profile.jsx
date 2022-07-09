import {BsTrash} from 'react-icons/bs'
import Button from '../../customComponents/button'
import ProfileLogic from './profilelogic'

export default function Profile() {
  const logic = ProfileLogic()

  const posts = () => {
    if(logic.loading) {
      return <h1>Loading...</h1>
    } else {
      let examplePostArr = []
      for(let i = 0; i < logic.secretArr.length; i++) {
        const secret = logic.secretArr[i]
        examplePostArr.push(
          <div className="yourposts_post" key={i}>
            <div className="yourposts_content">
              <p>{secret.content}</p>
            </div>
            <div className="yourposts_bottom">
              <div className="yourposts_dateCreated"> date created: {secret.date_created}</div>
              <Button className="yourposts_deleteButton" onClick={() => logic.deleteSecret(secret.n)}><BsTrash /></Button>
            </div>
          </div>
        )
      }
      return examplePostArr
    }
  }

  return (
    <div className="profile">
      <div className="createPost">
        <textarea cols="30" rows="10" onChange={logic.editTextarea} value={logic.textarea}></textarea>
        <Button className="createPost_button" onClick={logic.createPost}>Post</Button>
      </div>
      <div className="yourposts">
        {posts()}
      </div>
      <div className='profilePaginationWrap'>
        {logic.setPageGroup()}
      </div>
    </div>
  )
}