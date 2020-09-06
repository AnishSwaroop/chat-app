import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import TnC from './Pages/TnC';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

ReactDOM.render(
  <Router>
      <div>
        <Switch>
          <Route exact path = "/" component = {App}></Route>
          <Route exact path = "/tnc" component = {TnC}></Route>
        </Switch>
      </div>
    </Router>
  ,
  document.getElementById('root')
  );
