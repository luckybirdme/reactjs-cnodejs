import React from 'react'

import Divider from 'material-ui/Divider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from '../components/Header'

export default class About extends React.Component {

	render(){
		const style = {
	      headline: {
		    fontSize: 24,
		    marginBottom: 12,
		    fontWeight: 400,
		  },
	    }
		return (
			<MuiThemeProvider>
			  <div>
			  	<Header {...this.props}/>
			  	<div className="main">
			  
			  		
		                <h2 style={style.headline}>关于</h2>
				        <p>
				          本项目是基于Cnodejs的api，采用ReactJS前端框架，借助webpack开发的单页面web应用
				        </p>
				        <br />
				        <Divider />
				        <h2 style={style.headline}>地址</h2>
				        <p>
				          <a href="https://github.com/luckybirdme/reactjs-cnodejs">https://github.com/luckybirdme/reactjs-cnodejs</a>
				        </p>
				        <br />
				        <Divider />
	              	

			  	</div>
			  </div>
			 </MuiThemeProvider>
		)
	}

}

