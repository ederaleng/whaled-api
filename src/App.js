import React, { Component } from 'react';
import { Route,Switch } from 'react-router-dom'
import './App.css';
//component
import Operation from './components/sign/operation'
import Index from './components/index'
import Err404 from './components/err404'
class App extends Component {
  
  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path="/" component={Index}/>
          <Route exact path="/err" component={Err404} />
          <Route path="/sign/:operation" component={Operation}/>
          <Route component={Err404} />
        </Switch>
      </div>
    );
  }
}

export default App;
