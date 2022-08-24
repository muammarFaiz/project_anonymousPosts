import './topnavcss.css'
import {Link, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineArrowUp } from 'react-icons/ai'
import Topnavlogic from './topnavlogic';
import DropdownUser from './dropdownuser/dropdownuser';
import Uploadimg from '../../pages/user/uploadImg/uploadimg';
import EditProfile from '../../pages/user/editProfile/editProfile';
import UserinfoFloat from '../userinfoFloat/userinfoFloat';

export default function Top_navigation(props) {
  const logic = Topnavlogic();
  const navigate = useNavigate()
  const loginStatus = useSelector(state => state.memory.loginStatus)
  const capslock = useSelector(state => state.memory.capslock)
  const userImgSrc = useSelector(state => state.memory.userImgSrc)
  const showTopnavDropdown = useSelector(state => state.memory.showTopnavDropdown)
  const showChangeImg = useSelector(state => state.memory.showChangeImg)
  const showEditProfile = useSelector(state => state.memory.showEditProfile)
  const showauserinfo = useSelector(state => state.memory.showauserinfo)

  return (
    <>
    <div className="topnav-wrapper">
      <div className="topnavigation">
        <div className="logo">
          <h1 onClick={() => navigate('/')} tabIndex={0} onKeyUp={v => {
            if(v.key === 'Enter') navigate('/')
          }}>R</h1>
        </div>
        <div className="loginReg">
          <button className='topnav-info buttonAnchor' onClick={logic.showInfo}>Info</button>
          {
            loginStatus === 'ok' ?
            <>
            <Link to="/profile" className='loginButton buttonAnchor'>Profile</Link>
            <Link to="/#" className='buttonAnchor' onClick={logic.logout}>Logout</Link>
            <div className="topnav-userimage-wrapper">
              <img src={userImgSrc} alt="" onClick={logic.dropdownHandler} className='topnav-userimage' tabIndex={0}
                onKeyDown={e => e.key === 'Enter' ? e.target.click() : null} />
            </div>
            {showTopnavDropdown ? <DropdownUser /> : ''}
            </> :
              loginStatus === 'loading' ?
              <Link to="/#" className='buttonAnchor'>Loading user info...</Link> :
              <>
                <Link to="/login" className='loginButton buttonAnchor'>Login</Link>
                <Link to="/register" className='registerButton buttonAnchor'>Register</Link>
              </>
          }
        </div>
      </div>
      {
        logic.mainLoading ?
          <div className="homeLoading">
            <div className="homeLoadingMain">
              <p>Loading...</p>
            </div>
          </div> : ''
      }
      {
        capslock ?
        <div className="capsNotif">
          <div className="capsNotifMain">
            <p>CapsLock is on</p>
          </div>
        </div> : ''
      }
      {
        showChangeImg || showEditProfile ?
          <div className="editUsernameOrImg-background" onClick={() => logic.closeChangeUsernameAndImg(showChangeImg)}>
            <div className="editUsernameOrImg-wrapper" onClick={logic.noPropagate}>
            {showChangeImg ? <Uploadimg /> : ''}
            {showEditProfile ? <EditProfile /> : ''}
            </div>
          </div> : ''
      }
      {
        showauserinfo ?
          <div className="editUsernameOrImg-background" onClick={() => logic.closeShowauserinfo()}>
            <div className="editUsernameOrImg-wrapper" onClick={logic.noPropagate}>
              <UserinfoFloat />
            </div>
          </div> : ''
      }
        <button onClick={logic.gotophandler} style={{ display: logic.gotopdisplay }} className='topnav-topbutton'>
          <AiOutlineArrowUp size={25} />
        </button>
    </div>
    </>
  )
}