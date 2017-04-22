import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import {
  Redirect
} from 'react-router-dom'


export default class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			AccessToken: ''	
		};
	}

	handleChange = (event) => {
	    this.setState({AccessToken: event.target.value});
	}
	login = () => {
		let AccessToken = this.state.AccessToken
		this.props.login(AccessToken)
	}

	render(){

		const user = this.props.user
		if(user && Object.keys(user).length > 0){

			const { from } = this.props.location.state || { from: { pathname: '/' } }
		    
		    return (
		        <Redirect to={from}/>
		    )
		    
		}

		const errorText = this.props.status.error
		const doing = this.props.status.doing

		let loadStatus = 'hide'
		if(doing){
			loadStatus = 'loading'
		}
		
		const style = {
		  container: {
		    position: 'relative',
		    textAlign: 'center'
		  },
		  refresh: {
		    display: 'inline-block',
		    position: 'relative',
		  },
		  displayNone: {
		  	display: 'none'
		  },
		  displayBlock: {
		  	display: 'block'
		  }
		};


		return (

		  	<MuiThemeProvider>
			  	<div>

				  	<TextField
				      hintText="AccessToken"
				      hintStyle={{"width":"100%"}}
				      fullWidth={true}
				      style={{textAlign:'center',marginBottom:30}}
				      onChange={this.handleChange}
				      errorText={errorText}
				    />
				    <div style={doing ? style.displayNone:style.displayBlock} >
				    	<RaisedButton onTouchTap={this.login} label="Login" primary={true} fullWidth={true}  />

				    </div>
			    	<div style={style.container}>
					    <RefreshIndicator
					      size={40}
					      left={0}
					      top={0}
					      status={loadStatus}
					      style={style.refresh}
					    />
					</div>
			    </div>
			    
			</MuiThemeProvider>
		)
	}

}

