import React from 'react'

const Header = ({ course }) => (
  <h2>{course.name}</h2>
)

const Part = ({ name, ex }) => (
  <p>{name} {ex}</p>
)

const Total = ({ parts }) => {
  const total = 
    parts.reduce((sum, part) => sum + part.exercises, 0)
 
  return (
    <p><strong>total of {total} exercises</strong></p>
  )
}

const Content = ({course}) => {
  const parts = () =>
    course.parts.map(part => 
      <Part 
        key={part.id}
        name={part.name} 
        ex={part.exercises} 
      />)

  return (
    <div>
      {parts()}
      <Total parts={course.parts} />
    </div>
  )
}

const Course = ({ course }) => (
  <div>
    <Header course={course} />
    <Content course={course} />
  </div>
)

export default Course