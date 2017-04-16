import React from 'react'
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom'

import Home from './Home'
import About from './About'
import Login from './Login'
import Create from './Create'
import Detail from './Detail'
import User from './User'


// Some folks find value in a centralized route config.
// A route config is just data. React is great at mapping
// data into components, and <Route> is a component.


const routes = [
	{ 
		path: '/',
    component: Home,
    exact: true,
    name: 'Home'
  },
	{ 
		path: '/home/:tab',
    component: Home,
    name: 'Home'
  },
  { 
  	path: '/about',
    component: About,
    name: 'About'
  },
  { 
    path: '/login',
    component: Login,
    name: 'Login'
  },
  { 
    path: '/create',
    component: Create,
    name: 'Create'
  },
  { 
    path: '/detail/:id',
    component: Detail,
    name: 'Detail'
  },
  { 
    path: '/user/:loginname',
    component: User,
    name: 'User'
  }
]

export default () => (
  <BrowserRouter>
    <div>
      {routes.map((route, i) => (
        <Route key={i} exact={route.exact} path={route.path} render={props => (
			  	<route.component {...props} routeName={route.name}/>
			  )}/>
      ))}
    </div>
  </BrowserRouter>
)


