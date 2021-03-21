import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';
import Board from '../components/Board/Board';
import Header from "../components/Header/Header";

function App() {
  const [activeBoard, setActiveBoard] = useState(() => {
      return localStorage.getItem('expanded-board') || 'ALL';
  });
  const [refresh, setRefresh] = useState('ALL');
  useEffect(() => {
    const socket = io("/");
    socket.on("REFRESH_DATA", (message:any) => {
        setRefresh(message.FLAG);
    });
  }, [])
  const setExpandedBoard = (board:string) => {
    setActiveBoard(board);
    localStorage.setItem('expanded-board', board);
  }
  return (
    <div className="App">
        <header className="page-header">
            <Header />
        </header>
        <main className={`${activeBoard !== 'ALL' ? 'expanded' : '' }`}>
            {(activeBoard === 'ALL' || activeBoard === 'Highlights') && <Board boardName="Highlights" url="get_highlight" setExpandedBoard={setExpandedBoard} />}
            {(activeBoard === 'ALL' || activeBoard === 'Buyers') && <Board boardName="Buyers" url="get_buyer" setExpandedBoard={setExpandedBoard}/>}
            {(activeBoard === 'ALL' || activeBoard === 'Countries') && <Board boardName="Countries" url="get_country" setExpandedBoard={setExpandedBoard}/>}
            {(activeBoard === 'ALL' || activeBoard === 'Income') && <Board boardName="Income" url="get_income" setExpandedBoard={setExpandedBoard}/>}
        </main>
    </div>
  );
}

export default App;
