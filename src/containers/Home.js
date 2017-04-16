import React from 'react'


import Header from '../components/Header'
import BodyPage from '../components/BodyPage'
import { connect } from 'react-redux'
import { saveUser,todoStatus,doingStatus,doneStatus,saveTopic } from '../store/actions'

import 'whatwg-fetch'


const getTopic = (tab) => {
	return (dispatch,getState) => {	
		let state = getState()
		let status = state.status

		let doing = status.doing
		if(doing){
			return;
		}

		let topic = {
			data:[],
			search:{}
		}
		if(status && status.hasOwnProperty('topic')){
			topic = status.topic
		}

		let search = topic.search

		if(!search || Object.keys(search).length <= 0){
			search = {
		        page: 1,
		        limit: 20,
		        tab: 'all',
		        mdrender: true
			}
			topic.data = []
		}else if(tab && search.tab != tab){
			search.tab = tab
			search.page = 1
			topic.data = []
		}
		topic.search = search

		
		let esc = encodeURIComponent;
		let query = Object.keys(search)
		    .map(k => `${esc(k)}=${esc(search[k])}`)
		    .join('&');
		let url = "https://cnodejs.org/api/v1/topics?"+query;


		status.doing = true
		status.done = false
		status.topic = topic
		dispatch(todoStatus(status))
		//console.log(url)
		return fetch(url, {
		  method: 'GET',
		  headers: {
		    'Content-Type': 'application/json'
		  }
		}).then(response => {
			return response.json()
		}).then(json => {
			

			let res = json.data
			if(search.page == 1){
				topic.data = res
			}else{
				topic.data = topic.data.concat(res)
			}
			search.page += 1

			topic.search = search;
			

			
			
			status.topic = topic
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
    showTopic: (tab) => {
		dispatch(getTopic(tab))	
    }
  }
}


const MainPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(BodyPage)



export default class Home extends React.Component {
	render(){
		return (
		  <div>
		  	<Header {...this.props}/>
		  	<div className="main">
		  		<MainPage {...this.props} />
		  	</div>
		  </div>
		)	
	}
}

