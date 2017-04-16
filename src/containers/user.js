import React from 'react'


import Header from '../components/Header'
import UserPage from '../components/UserPage'
import { connect } from 'react-redux'
import { saveUser,todoStatus,doingStatus,doneStatus,saveTopic } from '../store/actions'

import 'whatwg-fetch'


const getUserDetail = (loginname) => {
	return (dispatch,getState) => {	
		let state = getState()
		let status = state.status

		let doing = status.doing
		if(doing){
			return;
		}

	
		let url = "https://cnodejs.org/api/v1/user/"+loginname;


		status.doing = true
		status.done = false
		dispatch(todoStatus(status))
		return fetch(url, {
		  method: 'GET',
		  headers: {
		    'Content-Type': 'application/json'
		  }
		}).then(response => {
			return response.json()
		}).then(json => {
			
			let account = {}
			if(json.success){
				account = json.data
			}
			
			status.account = account
			status.doing = false
			status.done = true
			dispatch(doneStatus(status))

			

			
		}).catch((ex) => {
			status.error = "Something mistake :" + ex;
			status.doing = false
			status.done = true
			dispatch(doneStatus(status))
		})
	}
}


const mapStateToProps = (state) => {
  return {
    status: state.status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showUserDetail: (loginname) => {
		dispatch(getUserDetail(loginname))	
    }
  }
}


const UserBody = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage)



export default class User extends React.Component {
	render(){
		return (
		  <div>
		  	<Header {...this.props}/>
		  	<div className="main">
		  		<UserBody {...this.props} />
		  	</div>
		  </div>
		)	
	}
}

