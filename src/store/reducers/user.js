const user = (state = {}, action) => {
  switch (action.type) {
    case 'saveUser':
      return action.user
    case 'clearUser':
      return {}
    default:
      return state
  }
}

export default user