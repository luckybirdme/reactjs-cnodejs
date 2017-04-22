import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from '../components/Header'
import TopicList from '../components/TopicList'

import RefreshIndicator from 'material-ui/RefreshIndicator';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ContentReply from 'material-ui/svg-icons/content/reply';


import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import { Link,Redirect } from 'react-router-dom'


import Tabs from 'material-ui/Tabs';
import Tab from 'material-ui/Tabs/Tab';

import Slider from 'material-ui/Slider';

import tool from '../lib/tool'


export default class UserPage extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    
    let loginname = this.props.match.params.loginname
    this.props.showUserDetail(loginname)
  }



  render(){

    const status = this.props.status
    let loadStatus = 'loading'
    let done = status.done
    if(done){
      loadStatus = 'hide'
    }

    let account = status.account;
    let recent_topics = []
    let recent_replies = []
    if(account && Object.keys(account).length >= 0){
      recent_replies = account.recent_replies
      recent_topics = account.recent_topics
    }else{
      return null
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
      'secondaryText':{
        marginRight:10
      },
      account_avatar:{
        textAlign:'center',
        marginTop:20,
        marginBottom:10
      },
      account_info:{
        textAlign:'center',
        color:'#778087',
        marginBottom:20
      }

    };

    const avatar_size = 80


    return (
      <MuiThemeProvider>
        <div>
            <div>  
              <div>
                <p style={style.account_avatar}>
                  <Avatar src={account.avatar_url} size={avatar_size} />
                </p>
                <p style={style.account_info}>
                  <span style={style.secondaryText} >{account.loginname}</span>
                  {tool.getLastTime(account.create_at)}
                </p>
              </div>

              <Tabs>
                <Tab label="最近话题" >
                  <div>
                    <List>
                      {recent_topics.map((item,key) =>
                          <Link key={key} to={`/detail/${item.id}`}>
                            <ListItem
                              leftAvatar={<Avatar src={item.author.avatar_url}  />}
                              primaryText={item.title}
                              secondaryText={
                                <div>
                                  <span style={style.secondaryText} >{item.author.loginname}</span>
                                  {tool.getLastTime(item.last_reply_at)} 

                                </div>
                              }
                            />
                            <Divider/>
                          </Link>
                        )
                      }
                    </List>
                  </div>
                </Tab>
                <Tab label="最新回复" >
                  <div>
                    <List >
                      {recent_replies.map((item,key) =>
                          <Link key={key} to={`/detail/${item.id}`}>
                            <ListItem
                              leftAvatar={<Avatar src={item.author.avatar_url}  />}
                              primaryText={item.title}
                              secondaryText={
                                <div>
                                  <span style={style.secondaryText} >{item.author.loginname}</span>
                                  {tool.getLastTime(item.last_reply_at)}

                                </div>
                              }
                            />
                            <Divider/>
                          </Link>
                        )
                      }
                    </List>
                  </div>
                </Tab>
              </Tabs>

              
              
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

