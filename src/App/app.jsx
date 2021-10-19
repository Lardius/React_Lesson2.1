import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Main from './layouts/main'
import Login from './layouts/login'
import Users from './layouts/users.jsx'
import { Redirect, Route, Switch } from 'react-router-dom'
import NavBar from './components/ui/navBar'

function App() {
  return <div>
    <NavBar/>
    <Switch>
      <Route path="/login/:type?" component={ Login }/>
      <Route path="/" exact component={ Main }/>
      <Route path="/users/:userId?" component={ Users }/>
      <Redirect to="/"/>
    </Switch>
  </div>
}

export default App
