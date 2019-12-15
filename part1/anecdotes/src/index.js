import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => (
  <button onClick={onClick}>{text}</button>
)

const Anecdote = ({anec}) => (
  <div>
    <span>{anec.anecdote}</span>
    <br />
    <span>has {anec.points} votes</span>
  </div>
)

const App = (props) => {
  const {anecdotes} = props
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(anecdotes[selected].points)

  const selectRandomIndex = (arr) => () => {
    setSelected(Math.floor(Math.random() * arr.length))
  }

  const voteUp = (anec) => () => {
    anec.points += 1
    setPoints(points + 1)
  }

  const setBestAnec = (anecs) => {
    let bestAnec = anecs[0]
    for (let i = 0, n = anecs.length; i < n; ++i) {
      if (anecs[i].points > bestAnec.points) {
        bestAnec = anecs[i]
      }
    }
    return bestAnec
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote anec={anecdotes[selected]} />
      <Button onClick={voteUp(anecdotes[selected])} text='vote' />
      <Button onClick={selectRandomIndex(anecdotes)} text='next anecdote' />
      <h2>Anecdote with most votes</h2>
      <Anecdote anec={setBestAnec(anecdotes)} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

// make every anecdote string into its own object,
// containing anecdote string itself and points for it
const anecsObjs = []
for (const anecStr of anecdotes) {
  const anec = {
    anecdote: anecStr,
    points: 0
  }
  anecsObjs.push(anec)
}

ReactDOM.render(
  <App anecdotes={anecsObjs} />,
  document.getElementById('root')
)