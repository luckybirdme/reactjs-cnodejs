import React from 'react'

import Header from '../components/Header'
import LoginForm from '../components/LoginForm'


import { connect } from 'react-redux'
import { saveUser,todoStatus,doingStatus,doneStatus } from '../store/actions'

import 'whatwg-fetch'

const getUser = (AccessToken) => {
	return dispatch => {	
		dispatch(todoStatus({
			error: '',
			doing: true
		}))
		if(AccessToken.length <= 0){
			dispatch(doneStatus({
				error:"AccessToken can't be empty",
				doing : false
			}))
			return;
		}
		let url = "https://cnodejs.org/api/v1/accesstoken"

		return fetch(url, {
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify({
		    accesstoken: AccessToken
		  })
		}).then(response => {
			return response.json()
		}).then(data => {
			if(data.success == true && data.loginname){
				let user = {
		            loginname: data.loginname,
		            avatar_url: data.avatar_url,
		            id: data.id,
		            accesstoken: AccessToken
		        }
		        dispatch(saveUser(user))
		        dispatch(doneStatus({
					error: '',
					doing: false
				}))

			}else{
				dispatch(doneStatus({
					error: "AccessToken is not right",
					doing: false
				}))
			}
		}).catch((ex) => {
			dispatch(doneStatus({
				error: "Something mistake :" + ex,
				doing: false
			}))
		})
	}
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    status: state.status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (AccessToken) => {
		dispatch(getUser(AccessToken))	
    }
  }
}

const UserLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)


export default class Login extends React.Component {

	render(){
		return (
		  <div>
		  	<Header {...this.props}/>
		  	<div className="main">
		  		<UserLogin {...this.props}/>
		  	</div>
		  </div>
		)
	}

}

