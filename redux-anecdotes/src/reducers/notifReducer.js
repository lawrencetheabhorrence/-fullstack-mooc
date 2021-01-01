/* eslint-disable no-case-declarations */

const initialState = ''

export const newNotif = (content) => ({
  type: 'NOTIFY', data: `you voted '${content}'`
})

export const resetNotif = () => ({
  type: 'RESET'
})

const notifReducer = (state = initialState, action) => {
  switch(action.type){
  case 'NOTIFY':
    return action.data
  default:
    return initialState
  }
}

export default notifReducer