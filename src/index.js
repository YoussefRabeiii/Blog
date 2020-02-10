import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as serviceWorker from './serviceWorker';

import Home from './pages/Home';
import About from "./pages/About";
import NotFound from "./pages/NotFound";

import Post from "./pages/Post"

import './index.css';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/404" component={NotFound} />
      <Route exact path="/post/:id" render={ props => <Post {...props} /> } />
    </div>
  </Router>,
  document.getElementById("root")
);

// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
