import './App.css';
import Topnavigation from './sections/top_navigation/topnavigation';
import { Outlet } from 'react-router-dom'
import Popupmessage from './sections/popupmessage/popupmessage';

function Ground() {

  return (
      <div className="App">
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
