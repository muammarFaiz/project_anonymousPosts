import './topnavcss.css'
import {Link, useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../App';
import Topnavlogic from './topnavlogic';

export default function Top_navigation(props) {
  const memory = useContext(Context)
  const logic = Topnavlogic();
  const navigate = useNavigate()

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
            memory.loginStatus === 'ok' ?
            <>
            <Link to="/profile" className='loginButton buttonAnchor'>Profile</Link>
            <Link to="/#" className='buttonAnchor' onClick={logic.logout}>Logout</Link>
            </> :
              memory.loginStatus === 'loading' ?
              <Link to="/#" className='buttonAnchor'>Loading user info...</Link> :
              <>
                <Link to="/login" className='loginButton buttonAnchor'>Login</Link>
                <Link to="/register" className='registerButton buttonAnchor'>Register</Link>
              </>
          }
        </div>
      </div>
      {
        memory.homeLoading ?
          <div className="homeLoading">
            <div className="homeLoadingMain">
              <p>Loading...</p>
            </div>
          </div> : ''
      }
      {
        memory.capslock ?
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