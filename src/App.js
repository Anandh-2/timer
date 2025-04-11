import React, { useEffect, useState } from 'react'
import Timer from './Timer'
import StopWatch from './StopWatch'
import './App.css';
import { Link, Route, Routes, useLocation } from 'react-router-dom';


function App() {

  const location = useLocation();
  const [appColor, setAppColor] = useState('deepskyblue');

  useEffect(()=>{
    if(location.pathname==='/'){
      setAppColor('deepskyblue');
    }else if(location.pathname==='/stopwatch'){
      setAppColor('coral');
    }
  },[location]);
  return (
    <div className='App' style={{backgroundColor:appColor, transition:"background-color 50ms linear"}}>
    <nav className='navbar' >
      <Link to={"/"}>Timer</Link>
      <Link to={"/stopwatch"}>Stop Watch</Link>
    </nav>
    <Routes>
      <Route path='/' element={<Timer/>}/>
      <Route path='/stopwatch' element={<StopWatch/>}/>
    </Routes>
    </div>
  )
}

export default App