import React from 'react';
import {Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Login from './auth/login'

function App() {
  return (
    <div className="App">
        
    <Route exact path="/" component={Login} />

  </div>
  );
}

export default App;
