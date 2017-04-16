import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import RefreshIndicator from 'material-ui/RefreshIndicator';

import TopicList from './TopicList'


import InfiniteScroll from 'react-infinite-scroller'



export default class BodyPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			shouldUpdate:true
		}
	}


	showTopic = (page,tab) => {
		this.props.showTopic(tab)
	}


	shouldComponentUpdate(nextProps){
		let shouldUpdate = true
		let topic = this.props.status.topic
		if(topic && topic.hasOwnProperty('search')){
			let search = topic.search
			let tab = nextProps.match.params.tab
			if(search && search.hasOwnProperty('tab')){
				let oldTab = search.tab
				if(tab && oldTab != tab){
					this.showTopic(0,tab)
					window.scrollTo(0, 0)
					shouldUpdate = false
				}
			}
		}else{
			this.showTopic()
			window.scrollTo(0, 0)
			shouldUpdate = false
		}
		return true;
	}

	render(){


		let done = this.props.status.done

		let topic = this.props.status.topic

		let topicData = []
		if(topic && topic.hasOwnProperty('data')){
			topicData = topic.data
		}
		
		let loadStatus = 'loading'
		if(done){
			loadStatus = 'hide'
		}
		
		const style = {
		  container: {
		    position: 'relative',
		    textAlign: 'center',
		    marginBottom:30
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
				  	<InfiniteScroll
				  		initialLoad={false}
					    pageStart={0}
					    loadMore={this.showTopic}
					    hasMore={true}
					    loader={
					    	<div style={style.container}>
							    <RefreshIndicator
							      size={40}
							      left={0}
							      top={20}
							      status={loadStatus}
							      style={style.refresh}
							    />
							</div>
						}>
					  
					  	<TopicList topic={topicData} {...this.props}/>

					</InfiniteScroll>
				</div>
			</MuiThemeProvider>
		)
	}

}

