
import { TODO_STATUS,DOING_STATUS,DONE_STATUS } from '../actions'

let statusId = 0;
const status = (state = {}, action) => {
  switch (action.type) {
    case TODO_STATUS:
      return Object.assign({},{TODO_STATUS},action.status)
    case DOING_STATUS:
      return Object.assign({},{DOING_STATUS},action.status)
    case DONE_STATUS:
      return Object.assign({},{DONE_STATUS},action.status)
    default:
      return state
  }
}

export default status