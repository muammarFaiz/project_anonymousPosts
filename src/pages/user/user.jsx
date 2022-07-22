import { useContext } from 'react'
import { Context } from '../../App'
import Uploadimg from './uploadImg/uploadimg'
import './usercss.css'
import UserLogic from "./userlogic"

export default function User() {
  const logic = UserLogic()
  const memory = useContext(Context)

  return (
    <div className="userProfile-wrapper">
      <div className="fromServer">
        <img src={memory.userImgSrc} alt="from server..." />
        <h2 className='userpage-username'>{memory.userinfo.username}</h2>
        <p className="userpage-useremail">{memory.userinfo.email}</p>
        <button className="userpage-changeusername">Change Username</button>
        <button className="userpage-changephoto" onClick={() => memory.setShowChangeImg(true)}>Change Photo</button>
        {
          memory.showChangeImg ?
          <div className="userpage-imageinputwrapper" onClick={logic.hideImgInput}>
            <div className="userpage-imageinput" onClick={logic.removeBubling}>
              <Uploadimg />
            </div>
          </div> : ''
        }
      </div>
    </div>
  )
}