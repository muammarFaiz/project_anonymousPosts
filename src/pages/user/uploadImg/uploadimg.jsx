import UploadImgLogic from "./uploadimglogic"
import './uploadimgcss.css'

export default function Uploadimg() {
  const logic = UploadImgLogic()

  return (
    <>
      <div className="userPic-input">
        <input type="file" onChange={logic.imgOnchange} accept='image/*' />
        <button onClick={logic.sendImage}>Confirm</button>
      </div>
      {
        logic.specialLoading ?
          <p className="uploadimg-loading">Loading...</p> : ''
      }
      <div className="user-pic-wrapper">
        <div className="user-pic">
          <img src="" alt="Your profile img..." ref={logic.imgPreview} />
        </div>
      </div>
    </>
  )
}