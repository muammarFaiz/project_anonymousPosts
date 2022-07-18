import './App.css';
import { createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLogic from './appLogic';
import Ground from './appGround';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Profile from './pages/profile/profile';

export const Context = createContext();

function App() {
  const memory = AppLogic();
  return (
    // <React.StrictMode>
    <BrowserRouter>
        {
          memory.loginStatus === 'loading' ?
            <h1>Loading...</h1> :
            <Context.Provider value={memory}>
              <Routes>
                <Route path="/" element={<Ground />}>
                  <Route index element={<Home />} />
                  {
                    memory.loginStatus === 'ok' ?
                    <>
                      <Route path='profile' element={<Profile />} />
                    </> :
                    <>
                      <Route path="login" element={<Login />} />
                      <Route path="register" element={<Register />} />
                    </>
                  }
                  <Route path="*" element={<Navigate to={'/'} />} />
                </Route>
              </Routes>
            </Context.Provider>
        }
    </BrowserRouter>
    // </React.StrictMode >
  );
}

export default App;