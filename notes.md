notable codes:
1. create root from reactDOM and render the react element, this is also a common place to use the provider element from react-redux to use redux
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './store'
import { Provider } from 'react-redux';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```
2. the app.js is the main react element, because this is the element that contain all the other react elements so this is where i create the react-router-dom tree using BrowserRouter, route, etc. this is also where i create a react context for functions that i can use for multiple react elements.  
in router tree, i can decide which route is available if the user is loged in, etc.  
this element is also the element that show the first ever loading (which many website ignore therefore the user will see a white blinding blank screen when loading) usually from verifying the user login status from server, but to reduce the number of loadings the user will experience, the app.js can also download data that the user will most likely use next, such as images, or informations/data that will be used repeatedly such as user profile data.
```jsx
import './App.css';
import { createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export const Context = createContext();

export default function App() {
  const memory = AppLogic();
  const loginStatus = useSelector(state => state.memory.loginStatus)

  return (
    <BrowserRouter>
      {
        loginStatus === 'loading' ?
          <h1>Loading...</h1> :
          <Context.Provider value={memory}>
            <Routes>
              <Route path="/" element={<Ground />}>
                <Route index element={<Home />} />
                {
                  loginStatus === 'ok' ?
                  <>
                    <Route path='profile' element={<Profile />} />
                    <Route path='user' element={<User />} />
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
  )
}
```