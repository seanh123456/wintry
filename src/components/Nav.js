import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import Home from './Home'
import Fire from './Fire'
import Budget from './Budget'
import Recipe from './Recipe'
import SignIn from './SignIn'
import logo from '../wintry.io.svg'
import '../css/Nav.css'

export default function Nav() {
  return (
    <Router>
      <div>
        <nav>
          <div className="wrapper no-pad">
            <ul>
              <li>
                <Link to="/"><img src={logo} className="App-home" alt="wintry" /></Link>
              </li>
              <li>
                <Link className="App-link" to="/fire">FIRE</Link>
              </li>
              <li>
                <Link className="App-link" to="/budget">Budget</Link>
              </li>
              <li>
                <Link className="App-link" to="/recipe">Recipe</Link>
              </li>
            </ul>
            <div className="nav-right">
              <Link className="App-link" to="/sign-in">Sign in</Link>
            </div>
          </div>
        </nav>
        <Switch>
          <Route path="/fire">
            <Fire />
          </Route>
          <Route path="/budget">
            <Budget />
          </Route>
          <Route path="/recipe">
            <Recipe />
          </Route>
          <Route path="/sign-in">
            <SignIn />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
