import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import RefreshIndicator from 'material-ui/RefreshIndicator';
import Divider from 'material-ui/Divider';
import {Menu, MenuItem} from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ContentReply from 'material-ui/svg-icons/content/reply';


import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import SelectField from 'material-ui/SelectField';

import {
  Redirect
} from 'react-router-dom'


export default class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorText:'',
      tab:'',
      title:'',
      content:''
    }
    this.props.clearCreate()
    
  }


  handleChangeTab = (event, index, value) => {
    this.setState({tab: value});
  }

  handleChangeTitle = (event) => {
    this.setState({title:event.target.value});
  }

  handleChangeContent = (event) => {
    this.setState({content: event.target.value});
  }
  createTopic = () => {
    
    let user = this.props.user
    if(!user || Object.keys(user).length <=0){
      this.props.history.push('/login')
      return;
    }

    let topic = {
      tab:this.state.tab,
      title:this.state.title,
      content:this.state.content
    }

    this.props.createTopic(topic)
  }

  shouldComponentUpdate(nextProps){
    let shouldUpdate = true
    let create = nextProps.status.create
    if(create){
      shouldUpdate = false 
      this.props.history.push('/')
    }
    return shouldUpdate
  }


  render(){

    const status = this.props.status
    const errorText = status.error
    let loadStatus = 'hide'
    let done = status.done
    let doing = status.doing
    if(doing){
      loadStatus = 'loading'
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
      },
      container: {
        position: 'relative',
        textAlign: 'center'
      }
    };

    return (
      <MuiThemeProvider>
        <div>
            <div> 
              <SelectField
                hintText="tab"
                onChange={this.handleChangeTab}
                fullWidth={true}
                value={this.state.tab}
              >
                <MenuItem value="" primaryText="" />
                <MenuItem value="good" primaryText="good" />
                <MenuItem value="share" primaryText="share" />
                <MenuItem value="ask" primaryText="ask" />
                <MenuItem value="job" primaryText="job" />
              </SelectField>
              <TextField
                hintText="title"
                hintStyle={{"width":"100%"}}
                fullWidth={true}
                onChange={this.handleChangeTitle}
              />

              <TextField
                hintText="content"
                multiLine={true}
                rows={4}
                rowsMax={10}
                fullWidth={true}
                onChange={this.handleChangeContent}
                errorText={errorText}
                hintStyle={{"width":"100%"}}
                style={{marginBottom:30}}
              />
              <div style={doing ? style.displayNone:style.displayBlock} >
                  <RaisedButton  onTouchTap={this.createTopic} label="Create" primary={true} fullWidth={true}  />
              </div>
            </div>
            <div style={style.container}>
                <RefreshIndicator
                  size={40}
                  left={0}
                  top={20}
                  status={loadStatus}
                  style={style.refresh}
                />
            </div>
        </div>
      </MuiThemeProvider>
    )
  }

}

