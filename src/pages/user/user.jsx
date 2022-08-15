
import { useSelector, useDispatch } from 'react-redux'
import { setShowChangeImg, setShowEditProfile } from '../../reduxSlices/mainstates/mainstates'
import './usercss.css'
import UserLogic from "./userlogic"
import { RiPencilLine } from 'react-icons/ri'

export default function User() {
  const logic = UserLogic()
  const userImgSrc = useSelector(state => state.memory.userImgSrc)
  const userinfo = useSelector(state => state.memory.userinfo)
  const dispatch = useDispatch()

  return (
    <div className="userProfile-wrapper">
      <div className="fromServer">
        <img src={userImgSrc} alt="from server..." />
        <h2 className='userpage-username'>{userinfo.username}</h2>
        <div className="user-aboutWrapper">
          <p>About:</p>
          {
            logic.bioUpdate ?
            <>
              <textarea name="" id="" cols="30" rows="4" placeholder='Edit your bio...'
                value={logic.bioContent} onChange={ev => logic.setBioContent(ev.target.value)}></textarea><br />
              <button onClick={() => logic.saveBio(userinfo.bio)}>Save</button>
              <button onClick={logic.cancelBioUpdate}>Cancel</button>
            </> : userinfo.bio ?
              <p>{userinfo.bio}</p> :
              <p>Your bio is empty...</p>
          }
          {logic.bioUpdate ? '' : <button onClick={() => logic.updateBio(userinfo.bio)}><RiPencilLine /></button>}
        </div>
        <p className="userpage-useremail">{userinfo.email}</p>
        <button className="userpage-changeusername" onClick={() => dispatch(setShowEditProfile(true))}>Change Username</button>
        <button className="userpage-changephoto" onClick={() => dispatch(setShowChangeImg(true))}>Change Photo</button><br />
      </div>
    </div>
  )
}