import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import MapsNearMe from 'material-ui/svg-icons/maps/near-me';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import ActionFeedback from 'material-ui/svg-icons/action/feedback';
import SubdirectoryArrowLeft from 'material-ui/svg-icons/navigation/subdirectory-arrow-left';

import IconButton from 'material-ui/IconButton';

import MenuItem from 'material-ui/MenuItem'
import Drawer from 'material-ui/Drawer'
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';

import SocialPersonOutline from 'material-ui/svg-icons/social/person-outline';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import SocialShare from 'material-ui/svg-icons/social/share';
import ActionQuestionAnswer from 'material-ui/svg-icons/action/question-answer';
import ActionWork from 'material-ui/svg-icons/action/work';

import Divider from 'material-ui/Divider';

import { Link,Redirect } from 'react-router-dom'

import { connect } from 'react-redux'



class head extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
		  open: false,
		  title: this.props.routeName
		}
	}


	handleToggle = () => this.setState({open: !this.state.open});

	handleClose = () => this.setState({open: false});

	changeOpen = (open) => {
		this.setState({open: open})
	}

	touchCreate = () => {
		this.handleClose()
		this.props.history.push('/create')
	};

	login = () => {
		this.handleClose()
		let uri = this.props.location.pathname
		this.props.history.push('/login',{fromUri:uri})
	}

	logout = () => {
		this.handleClose()
		this.props.clearUser()
		this.props.history.push('/login')
	}

	render(){


		const user = this.props.user
		let login = false

		let logoutStyle = {}
		let loginStyle = {}
		if(user && Object.keys(user).length > 0){
			loginStyle ={
				display:'none'
			}
			login = true
		}else{
			logoutStyle = {
				display:'none'
			}
		}


		return (
			<MuiThemeProvider>
				<div>
					<AppBar
						iconElementLeft={<IconButton><NavigationMenu /></IconButton>}
						onLeftIconButtonTouchTap={this.handleToggle}
						title={this.state.title}
						titleStyle={{textAlign: 'center'}}
						iconElementRight={<IconButton  ><MapsNearMe /></IconButton>}
						onRightIconButtonTouchTap={this.touchCreate}
						style={{position: 'fixed'}}
					/>
					<Drawer
			          docked={false}
			          width={200}
			          open={this.state.open}
			          onRequestChange={this.changeOpen}
			        >
					      <Menu>
					      	<div  style={loginStyle}>
						        <MenuItem onTouchTap={this.login} primaryText="登录" leftIcon={<SocialPersonOutline />} />
						        
						    </div>
					        <div style={logoutStyle}>
						        <Link to={`/user/${user.loginname}`}>
						        	<MenuItem primaryText={user.loginname} leftIcon={<ActionAccountCircle />} />
						        </Link>

						        <MenuItem onTouchTap={this.logout} primaryText='退出' leftIcon={<SubdirectoryArrowLeft />} />
						        
					        </div>

					        <Divider />
					        <Link to="/home/all" onTouchTap={this.handleClose}>
					        	<MenuItem primaryText="全部" leftIcon={<ActionHome />} />
					        </Link>
					        <Link to="/home/good" onTouchTap={this.handleClose}>
					        	<MenuItem primaryText="精华" leftIcon={<ActionThumbUp />} />
					        </Link>
					        <Link to="/home/share" onTouchTap={this.handleClose}>
					        	<MenuItem primaryText="分享" leftIcon={<SocialShare />} />
					        </Link>
					        <Link to="/home/ask" onTouchTap={this.handleClose}>
					        	<MenuItem primaryText="问题" leftIcon={<ActionQuestionAnswer />} />
					        </Link>
					        <Link to="/home/job" onTouchTap={this.handleClose}>
					        	<MenuItem primaryText="招聘" leftIcon={<ActionWork />} />
					        </Link>
					        <Divider />
					        <Link to="/about" >
					        	<MenuItem primaryText="关于" leftIcon={<ActionFeedback />} />
					        </Link>
					      </Menu>
			        </Drawer>
		        </div>
			</MuiThemeProvider>
		)
	}
}


const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

import { clearUser } from '../store/actions'

const mapDispatchToProps = (dispatch) => {
  return {
    clearUser: () => {
      dispatch(clearUser())
    }
  }
}


const Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(head)

export default Header

