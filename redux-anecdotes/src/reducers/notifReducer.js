/* eslint-disable no-case-declarations */

const initialState = ''

export const setNotification = (content, timer) => {
  return async dispatch  => {
    dispatch({ type: 'NOTIFY', data: `you voted '${content}'`})
    setTimeout(() => dispatch({ type: 'RESET' }),  timer)
  }
}

const notifReducer = (state = initialState, action) => {
  switch(action.type){
  case 'NOTIFY':
    return action.data
  default:
    return initialState
  }
}

export default notifReducer