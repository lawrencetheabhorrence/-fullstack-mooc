import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notif)
  const visibility = { display: notification === '' ? 'none' : '' }
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  return (
    <div style={visibility}>
      <div style={style}>
        {notification}
      </div>
    </div>
  )
}

export default Notification