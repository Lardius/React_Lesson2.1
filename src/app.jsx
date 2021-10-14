import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Main from './layouts/main'
import Login from './layouts/login'
import Users from './layouts/users.jsx'
import { Route, Switch } from 'react-router-dom'
import NavBar from './components/navBar'

function App() {
  return <div>
    <NavBar/>
    <Switch>
      <Route path="/Login" component={ Login }/>
      <Route path="/" exact component={ Main }/>
      <Route path="/Users/:userId?" component={ Users }/>
    </Switch>
  </div>
}

export default App
