import ProfileLogic from './profilelogic'

import './profilecss.css'
import InputSecret from '../../sections/inputSecret/inputSecret'

export default function Profile() {
  const logic = ProfileLogic()
  return (
    <div className="profile">
      <InputSecret />
      <div className="profile-navigation-wrapper">
        <button onClick={logic.gotoPosts} className={
          logic.content === 'posts' ? 'profile-gotobutton-on profile-gotobutton' : 'profile-gotobutton'
        }>Posts</button>
        <button onClick={logic.gotoBookmark} className={
          logic.content === 'bookmark' ? 'profile-gotobutton-on profile-gotobutton' : 'profile-gotobutton'
        }>Bookmarks</button>
      </div>
      <div className="yourposts">
        <div className="cardwrap">
          {logic.cardsForProfile()}
        </div>
      </div>
      {
        logic.content === 'posts' ?
          <div className='profilePaginationWrap'>
            {logic.setPageGroup()}
          </div> : ''
      }
      {
        logic.nextButtonStatus || logic.backbutton ?
          <div className="nextbutton-bookmark">
            {logic.backbutton ? <button onClick={logic.bookmarkBack}>Back</button> : ''}
            {logic.nextButtonStatus ? <button onClick={logic.bookmarkNext}>Next</button> : ''}
          </div> : ''
      }
    </div>
  )
}