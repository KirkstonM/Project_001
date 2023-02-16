import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom';
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Home from './pages/Home/Home'

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<Register />} exact/>
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        

      </Routes>
    </div>
  );
}

export default App;
