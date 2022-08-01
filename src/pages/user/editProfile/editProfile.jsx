import { useContext } from 'react'
import { Context } from '../../../App'
import './editProfileCss.css'
import EditProfileLogic from './editProfileLogic'

export default function EditProfile() {
  const logic = EditProfileLogic()
  const memory = useContext(Context)
  return (
    <div className="editProfileGround">
      <p className="editprofile-prevusername">Current name:</p>
      <h2>{memory.userinfo.username}</h2>
      {
        logic.editProfileLoading ?
          <p className="editprofile-showloading">{logic.editProfileLoading}</p> : ''
      }
      <input type="text" ref={logic.inputElem} /><button onClick={logic.changeUsername}>Confirm</button>
    </div>
  )
}