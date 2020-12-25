import React from 'react'

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }

  const notifType = isError ? 'error' : 'note'

  return (
    <div className={notifType}> {message} </div>
  )
}

export default Notification