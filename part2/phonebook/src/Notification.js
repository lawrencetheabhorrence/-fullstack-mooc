import React from 'react'

const Notification = ({message}) =>{
	const style = {
		color: 'green',
		fontSize: 16,
		backgroundColor: 'lightGray',
		borderRadius: 5,
		padding: 10,
		marginBottom: 15
	}

	if({message} === null){return null}
	else{return(<div style={style}>{message}</div>)}
}

export default Notification