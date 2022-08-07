
import { useSelector, useDispatch } from 'react-redux'
import { setShowChangeImg, setShowEditProfile } from '../../reduxSlices/mainstates/mainstates'
import EditProfile from './editProfile/editProfile'
import Uploadimg from './uploadImg/uploadimg'
import './usercss.css'
import UserLogic from "./userlogic"

export default function User() {
  const logic = UserLogic()
  const userImgSrc = useSelector(state => state.memory.userImgSrc)
  const userinfo = useSelector(state => state.memory.userinfo)
  const showChangeImg = useSelector(state => state.memory.showChangeImg)
  const showEditProfile = useSelector(state => state.memory.showEditProfile)
  const dispatch = useDispatch()

  return (
    <div className="userProfile-wrapper">
      <div className="fromServer">
        <img src={userImgSrc} alt="from server..." />
        <h2 className='userpage-username'>{userinfo.username}</h2>
        <p className="userpage-useremail">{userinfo.email}</p>
        <button className="userpage-changeusername" onClick={() => dispatch(setShowEditProfile(true))}>Change Username</button>
        <button className="userpage-changephoto" onClick={() => dispatch(setShowChangeImg(true))}>Change Photo</button>
        {
          showChangeImg || showEditProfile ?
            <div className="userpage-imageinputwrapper" onClick={logic.hideImgInput}>
              <div className="userpage-imageinput" onClick={logic.removeBubling}>
                {
                  showChangeImg ? <Uploadimg /> : <EditProfile />
                }
                
              </div>
            </div> : ''
        }
      </div>
    </div>
  )
}