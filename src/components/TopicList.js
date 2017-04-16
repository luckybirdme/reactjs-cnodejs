import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import RefreshIndicator from 'material-ui/RefreshIndicator';

import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import ContentReply from 'material-ui/svg-icons/content/reply';
import Divider from 'material-ui/Divider';


import ContentForward from 'material-ui/svg-icons/content/forward';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';

import SocialShare from 'material-ui/svg-icons/social/share';
import ActionQuestionAnswer from 'material-ui/svg-icons/action/question-answer';
import ActionWork from 'material-ui/svg-icons/action/work';
import ActionHome from 'material-ui/svg-icons/action/home';

import { Link } from 'react-router-dom'

import Moment from 'react-moment';

import {teal500, red500, greenA200,orange900,blueA700,pinkA400,cyan500} from 'material-ui/styles/colors';


export default class TopicList extends React.Component {
  constructor(props) {
    super(props);
  }

  getTabIcon(item){
    const style = {
      tabIcon:{
        marginBottom:-5,
        marginRight:8
      }
    }

    const tabIcon = {
      home: <ActionHome color={cyan500} style={style.tabIcon} />,
      good: <ActionThumbUp color={red500} style={style.tabIcon} />,
      share: <SocialShare color={teal500} style={style.tabIcon} />,
      ask: <ActionQuestionAnswer color={pinkA400} style={style.tabIcon} />,
      job: <ActionWork color={blueA700} style={style.tabIcon} />
    }
    let icon = ''
    if(item.top){
      icon = <ContentForward color={orange900} style={style.tabIcon} className="counterclockwise90" />
    }else if(item.good){
      icon = tabIcon['good']
    }else{
      icon = tabIcon[item.tab]
    }
    if(!icon){
      icon = tabIcon['home']
    }

    return icon
  }

  render(){
    let topic = this.props.topic
    if(!topic || Object.keys(topic).length <= 0){
      return null;
    }
    const style = {
      'leftIcon':{
        marginLeft:0,
        marginRight:0
      },
      'secondaryText':{
        marginLeft:10
      },
      topicTitle:{
        lineHeight:'24px'
      },
      avatar:{
        left:6,
        top:21
      },
      ListItemText:{
        marginLeft:-10,
        marginRight:-10
      }

    }



    return (
      <MuiThemeProvider>
         <List>
          {topic.map((item,key) =>
              <Link key={key} to={`/detail/${item.id}`}>
                <ListItem
                  leftAvatar={<Avatar style={style.avatar} src={item.author.avatar_url}  />}
                  primaryText={
                    <div style={style.ListItemText}>
                      <span >{this.getTabIcon(item)}</span>
                      <span style={style.topicTitle} >{item.title}</span>
                    </div>
                  }
                  secondaryText={
                    <div style={style.ListItemText}>
                      <Moment fromNow>{item.last_reply_at}</Moment> 
                      <span style={style.secondaryText}>{`${item.reply_count} comments`}</span>

                    </div>
                  }
                />
                <Divider/>
              </Link>
            )
          }
         </List>          
      </MuiThemeProvider>
    )
  }

}

