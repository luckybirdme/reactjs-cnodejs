import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from '../components/Header'
import TopicList from '../components/TopicList'

import RefreshIndicator from 'material-ui/RefreshIndicator';
import Divider from 'material-ui/Divider';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ContentReply from 'material-ui/svg-icons/content/reply';


import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import {blue300} from 'material-ui/styles/colors';

import tool from '../lib/tool'


export default class DetailBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorText:'',
      replyContent:'',
      replyAction:false
    }
  }

  handleChange = (event) => {
      this.setState({replyContent: event.target.value});
      this.goToBottom()
  }

  componentWillMount() {
    let id = this.props.match.params.id
    this.props.showTopicDetail(id)
    this.goToTop();
  }

  goToTop(){
    window.requestAnimationFrame(function() {
      window.scrollTo(0,0)
    });
  }
  goToBottom(){
    window.requestAnimationFrame(function() {
      const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
      window.scrollTo(0,docHeight+windowHeight)
    });

  }


  createMarkup(html) {
      return {__html: html}; 
  }

  clickReply = () => {
    if(!this.login()){
      return false
    }
    this.goToBottom()

  }

  login = () => {
    let user = this.props.user
    if(!user || Object.keys(user).length <=0){
      let uri = this.props.location.pathname
      this.props.history.push('/login',{fromUri:uri})
      return false
    }else{
      return true
    }
    
  }

  replyTopic = () => {

    if(!this.login()){
      return false
    }

    let replyContent = this.state.replyContent

    this.props.replyTopic(replyContent)
    this.setState({replyAction:true});

    
  }

  shouldComponentUpdate(nextProps){
    if(this.state.replyContent){
      this.goToBottom()
      this.setState({replyAction:false})
      this.setState({replyContent:''})
    }
    return true
  }



  render(){

    const status = this.props.status
    const errorText = status.error
    let loadStatus = 'loading'
    let done = status.done
    let doing = status.doing
    if(done){
      loadStatus = 'hide'
    }
    let topicData = []
    let replyNumber = 0
    let detail = {}
    let replies = []
    if(status.detail){
      detail = status.detail
      topicData = [detail]
      replies = detail.replies
      replyNumber = replies.length
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
      },
      replyNumber:{
        color:blue300
      },
      'secondaryText':{
        marginRight:10
      },
      avatar:{
        left:6,
        top:21
      },
      ListItemText:{
        marginLeft:-10,
      }
    };

    return (
      <MuiThemeProvider>
        <div>
            <div style={done ? style.displayBlock:style.displayNone}> 
              <TopicList topic={topicData} {...this.props}/>
              
              <div className="markdown-body" dangerouslySetInnerHTML={this.createMarkup(detail.content)} />
                
              <Divider />
                <List>
                  <ListItem primaryText={<div>评论 <span style={style.replyNumber}>{replyNumber}</span> 次</div>} />
                </List>
              <Divider  />
              
              <List>
                {replies.map((item,key) =>
                    <div key={key}  >
                      <ListItem
                        leftAvatar={<Avatar style={style.avatar} src={item.author.avatar_url}  />}
                        primaryText={
                          <div style={style.ListItemText} className="markdown-body" dangerouslySetInnerHTML={this.createMarkup(item.content)} />
                        }
                        secondaryText={
                          <div style={style.ListItemText} >
                            <span style={style.secondaryText} >{item.author.loginname}</span>
                            {tool.getLastTime(item.create_at)}

                          </div>
                        }
                        rightIconButton={
                          <IconButton onTouchTap={this.clickReply}>
                            <ContentReply color={blue300}  />
                          </IconButton>
                        }
                      />
                      <Divider/>
                    </div>
                  )
                }
              </List>
              <TextField
                hintText="Comment"
                multiLine={true}
                rows={2}
                rowsMax={4}
                fullWidth={true}
                onChange={this.handleChange}
                errorText={errorText}
                hintStyle={{"width":"100%"}}
                style={{marginBottom:30}}
                value={this.state.replyContent}
              />
              <div style={doing ? style.displayNone:style.displayBlock} >
                  <RaisedButton onTouchTap={this.replyTopic} label="Comment" primary={true} fullWidth={true}  />
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

