// import { useContext } from 'react'
import { useSelector } from 'react-redux'
// import { Context } from '../../../App'
import './editProfileCss.css'
import EditProfileLogic from './editProfileLogic'

export default function EditProfile() {
  const logic = EditProfileLogic()
  // const memory = useContext(Context)
  const userinfo = useSelector(state => state.memory.userinfo)

  return (
    <div className="editProfileGround">
      <p className="editprofile-prevusername">Current name:</p>
      <h2>{userinfo.username}</h2>
      {
        logic.editProfileLoading ?
          <p className="editprofile-showloading">{logic.editProfileLoading}</p> : ''
      }
      <input type="text" ref={logic.inputElem} /><button onClick={logic.changeUsername}>Confirm</button>
    </div>
  )
}