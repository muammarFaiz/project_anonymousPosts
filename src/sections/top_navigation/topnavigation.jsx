import './topnavcss.css'
import {Link} from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../App';
import Topnavlogic from './topnavlogic';

export default function Top_navigation(props) {
  const memory = useContext(Context)
  const logic = Topnavlogic();

  return (
    <>
    <div className="topnavigation">
      <div className="logo">
        <h1>R</h1>
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
    </>
  )
}