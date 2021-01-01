/* eslint-disable no-case-declarations */

const initialState = ''

export const setFilter = (content) => ({ type: 'FILTER', data: content })
export const resetFilter = () => ({ type: 'RESET' })

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'FILTER':
    return action.data
  default:
    return initialState
  }
}

export default filterReducer