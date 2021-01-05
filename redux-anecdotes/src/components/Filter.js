import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    const content = event.target.value
    props.setFilter(content)
  }
  const style = { marginBottom: 10 }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = { setFilter, }

const mapStateToProps = (state) => {}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)