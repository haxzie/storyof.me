import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from './components/home/container/HomePage';
import stylefire from './themes';


function App() {

  stylefire.init();
  
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={HomePage}/>
      </div>
    </Router>
  );
}

export default App;
