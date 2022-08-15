import UserinfoFloatLogic from "./userinfoFloatLogic"

export default function UserinfoFloat() {
  const logic = UserinfoFloatLogic()

  return (
    <div className="userinfoWrapper">
      {
        logic.loading ? <p>Loading...</p> :
        <>
          <img src={
            `data:${logic.userpublicinfo.profileImage.mimetype};base64,${logic.userpublicinfo.profileImage.buffer}`
          } alt="" className="float-userimg" />
          <p className="float-username">{logic.userpublicinfo.username}</p>
          <p className="float-userbio">{logic.userpublicinfo.bio}</p>
        </>
      }
      <button onClick={logic.closeMe} ref={logic.okbutton}>Ok</button>
    </div>
  )
}