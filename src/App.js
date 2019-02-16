import React, { Component } from 'react';
import './App.css';
import Operation from './components/operation'
import { Route } from 'react-router-dom'
class App extends Component {
  
  render() {
    return (
      <div className="container">
        <Route path="/sign/:operation" component={Operation}/>
      </div>
    );
  }
}

export default App;
