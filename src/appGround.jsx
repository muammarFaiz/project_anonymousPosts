import './App.css';
import Topnavigation from './sections/top_navigation/topnavigation';
import { Outlet } from 'react-router-dom'
import Popupmessage from './sections/popupmessage/popupmessage';
import { useContext } from 'react';
import { Context } from './App';



function Ground() {
  const memory = useContext(Context)

  return (
      <div className="App" onKeyUp={memory.capsPressed}>
        <header className="App-header">
          <Topnavigation />
        </header>
        <main>
          <Popupmessage />
          <Outlet />
        </main>
      </div>
  );
}

export default Ground;
// to App.jsx
