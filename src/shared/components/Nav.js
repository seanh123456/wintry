import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import Home from './Home'
import SignIn from '../../authentication/components/SignIn'
import Finance from '../../finance/components'
import Recipe from '../../recipe/components/Recipe'
import '../../scss/Nav.scss'

export default function Nav() {
  return (
    <Router>
      <nav>
        <div className="wrapper no-pad">
          <ul>
            <li>
              <Link className="App-link App-home" to="/">Wintry</Link>
            </li>
            <li>
              <Link className="App-link" to="/finance">Finance</Link>
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
        <Route path="/finance">
          <Finance />
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
    </Router>
  )
}
