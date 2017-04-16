import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from '../components/Header'
import DetailBody from '../components/DetailBody'

import RefreshIndicator from 'material-ui/RefreshIndicator';
import Divider from 'material-ui/Divider';
import {Menu, MenuItem} from 'material-ui/Menu';

import {blue300} from 'material-ui/styles/colors';
import { connect } from 'react-redux'
import { saveUser,todoStatus,doingStatus,doneStatus,saveTopic } from '../store/actions'


import 'whatwg-fetch'

const getTopicDetail = (id) => {
	return (dispatch,getState) => {	
		let state = getState()
		let status = state.status

		let doing = status.doing
		if(doing){
			return;
		}

		console.log(id)
		let url = "https://cnodejs.org/api/v1/topic/"+id;

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
			let detail = json.data
			status.detail = detail;			
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

const postReplyTopic = (content) => {
	return (dispatch,getState) => {	
		let state = getState()
		let status = state.status

		let user = state.user

		let doing = status.doing
		if(doing){
			return;
		}
		status.error = ''
	    if(content.length <= 0){
	    	status.error = "Comment can't be empty";
			dispatch(doneStatus(status))
			return;
		}

		let detail = status.detail
		let id = detail.id

		console.log(id)
		let url = 'https://cnodejs.org/api/v1/topic/' + id + '/replies'

		let postData = {
	        accesstoken: user.accesstoken,
	        content: content + ' --- From [LBRC](https://github.com/luckybirdme/Reactjs-cnodejs)'
	    }

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
				let time = new Date()
				if(!detail.replies || detail.replies.length <= 0){
					detail.replies = []
				}
	            detail.replies.push({
	              author: user,
	              content: content,
	              create_at: time
	            })
	        }
			
			status.detail = detail;			
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
    status:state.status
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    showTopicDetail: (id) => {
    	dispatch(getTopicDetail(id))
    },
    replyTopic: (content) => {
    	dispatch(postReplyTopic(content))
    }
  }
}


const DetailContent = connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailBody)


export default class Detail extends React.Component {

	render(){

		return (
		  <MuiThemeProvider>
		  	<div>
			  	<Header {...this.props}/>
			  	<div className="main">
		
					<DetailContent  {...this.props}/>
						
			  	</div>
		  	</div>
		  </MuiThemeProvider>
		)
	}

}

