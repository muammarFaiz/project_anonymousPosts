import './topnavcss.css'
import {Link, useNavigate} from 'react-router-dom';
// import { useContext } from 'react';
// import { Context } from '../../App';
import Topnavlogic from './topnavlogic';
import { useSelector } from 'react-redux';

export default function Top_navigation(props) {
  // const memory = useContext(Context)
  const logic = Topnavlogic();
  const navigate = useNavigate()
  const count = useSelector(state => state.counter.value)
  const loginStatus = useSelector(state => state.memory.loginStatus)
  const capslock = useSelector(state => state.memory.capslock)
  const userImgSrc = useSelector(state => state.memory.userImgSrc)

  console.log('topnav render');
  // using what you learn from redux, try to move all the context into redux store
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
          {
            loginStatus === 'ok' ?
            <>
            <Link to="/profile" className='loginButton buttonAnchor'>Profile</Link>
            <Link to="/#" className='buttonAnchor' onClick={logic.logout}>Logout</Link>
            <div className="topnav-userimage-wrapper">
              <img src={userImgSrc} alt="" onClick={v => navigate('/user')} className='topnav-userimage' />
            </div>
            </> :
              loginStatus === 'loading' ?
              <Link to="/#" className='buttonAnchor'>Loading user info...</Link> :
              <>
                <p>{count}</p>
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
    </div>
    </>
  )
}