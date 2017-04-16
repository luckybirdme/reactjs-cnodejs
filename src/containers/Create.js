import React from 'react'

import Header from '../components/Header'
import CreateForm from '../components/CreateForm'


import { connect } from 'react-redux'
import { saveUser,todoStatus,doingStatus,doneStatus } from '../store/actions'

import 'whatwg-fetch'

const postCreateTopic = (topic) => {
	return (dispatch,getState) => {	

		let state = getState()
		let status = state.status

		let doing = status.doing
		if(doing){
			return;
		}

		status.error = ''
		if(!topic.tab){
			status.error = "tab is empty"
		}else if(!topic.title){
			status.error = "title is empty"
		}else if(!topic.content){
			status.error = "content is empty"
		}

		if(status.error){
			dispatch(doneStatus(status))
			return;
		}


		let url = 'https://cnodejs.org/api/v1/topics'

		let user = state.user
		let postData = {
	        content: topic.content + ' --- From [LBRC](https://github.com/luckybirdme/Reactjs-cnodejs)',
	        accesstoken: user.accesstoken
	    }
	    postData = Object.assign({},topic,postData)

		status.doing = true
		status.done = false
		dispatch(todoStatus(status))

		return fetch(url, {
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(postData)
		}).then(response => {
			return response.json()
		}).then(json => {
			if (json.success) {
				status.create = true;	
	        }else{
	        	status.error = json.error_msg
	        }
			
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
    user: state.user,
    status: state.status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createTopic: (topic) => {
		dispatch(postCreateTopic(topic))	
    }
  }
}

const TopicForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateForm)


export default class Create extends React.Component {

	render(){
		return (
		  <div>
		  	<Header {...this.props}/>
		  	<div className="main">
		  		<TopicForm {...this.props}/>
		  	</div>
		  </div>
		)
	}

}

