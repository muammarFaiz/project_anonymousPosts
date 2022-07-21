import './usercss.css'
import UserLogic from "./userlogic"

export default function User() {
  const logic = UserLogic()

  return (
    <div className="userProfile-wrapper">
      <div className="userPic-input">
        <input type="file" onChange={logic.imgOnchange} accept='image/*' />
        <button onClick={logic.sendImage}>Upload</button>
      </div>
      <div className="user-pic-wrapper">
        <div className="user-pic">
            <img src="" alt="Your profile img..." ref={logic.imgPreview} />
            <img src="" alt="buffer from server" ref={logic.imgUsingBuffer} /><br />
        </div>
      </div>
      <div className="fromServer">
        <img src="" alt="from server..." ref={logic.imgFromServer} />
        <button onClick={logic.getFromServer}>get from server</button>
      </div>
    </div>
  )
}