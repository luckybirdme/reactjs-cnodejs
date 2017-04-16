import React from 'react'
import Router from './Router'

import { Provider } from 'react-redux'
import configureStore from '../store/configureStore';

import '../static/css/global.css';
import '../static/css/github-markdown.css';

const store = configureStore()

export default class Root extends React.Component {
	render(){
		return (
			<Provider store={store}>
				<Router />
			</Provider>
		)
	}
}


