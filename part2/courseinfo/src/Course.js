import React from 'react';

const Course = ({ course }) =>{
	return(
		<div>
		<Header course={course}/>
		<Content course={course}/>
		<Total course={course}/>
		</div>
	)
}

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  const exercises = course.parts.map(part => part.exercises)
  let sum = 0
  const reducer = (sum, exercise) => sum + exercise
  return(
    <p><strong>total of {exercises.reduce(reducer)}</strong></p>
  ) 
}

const Part = ({name, exercises}) => {
  return (
    <p>
      {name} {exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part =>
      	<Part key={part.id} name={part.name} exercises={part.exercises}/>
      )}
    </div>
  )
}

export default Course