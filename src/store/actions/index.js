export function saveUser(user){
  return {
    type: 'saveUser',
    user
  }
}

export function clearUser(){
  return {
    type: 'clearUser'
  }
}



export const TODO_STATUS = 'TODO_STATUS'
export const DOING_STATUS = 'DOING_STATUS'
export const DONE_STATUS = 'DONE_STATUS'

export function todoStatus(status){
  return {
    type: TODO_STATUS,
    status
  }
}

export function doingStatus(status){
  return {
    type: DOING_STATUS,
    status
  }
}

export function doneStatus(status){
  return {
    type: DONE_STATUS,
    status
  }
}





