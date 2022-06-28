import './App.css';
import Topnavigation from './sections/top_navigation/topnavigation';
import Cards from './sections/cards/cards'
import {Outlet} from 'react-router-dom'
import { createContext, useState } from 'react';
import AppLogic from './appLogic';
import Popupmessage from './sections/popupmessage/popupmessage';

export const Context = createContext();

function App() {
  const memory = AppLogic();
  return (
    <Context.Provider value={memory}>
    <div className="App">
      <header className="App-header">
        <Topnavigation />
      </header>
      <main>
        <Popupmessage />
        <Outlet />
      </main>
    </div>
    </Context.Provider>
  );
}

export default App;
