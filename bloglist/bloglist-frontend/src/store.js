import { createStore } from 'redux'

export const notifReducer = (state = {notif: '', error: false}, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return { notif: action.data, error: false }
    case 'ERROR':
      return { notif: action.data, error: true }
    case 'RESET':
      return { notif: '', error: false }
    default:
      return state
  }
}

const store = createStore(notifReducer)

export default store