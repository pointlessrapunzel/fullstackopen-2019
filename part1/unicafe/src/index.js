import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  let all = good + neutral + bad;
  let average = (good * 1 + neutral * 0 + bad * -1) / all;
  let positive = (good / all) * 100; 

  if (all <= 0) return (
    <div>
      <p>No feedback given</p>
    </div>
  )

  return (
    <table>
      <tbody>
        <Statistic text='good' value={good} />
        <Statistic text='neutral' value={neutral} />
        <Statistic text='bad' value={bad} />
        <Statistic text='all' value={all} />
        <Statistic text='average' value={average.toFixed(1)} />
        <Statistic text='positive' value={positive.toFixed(1)} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setFeedback = (feedback) => () => {
    return feedback === 'good' ? setGood(good + 1) :
            feedback === 'bad' ? setBad(bad + 1) :
            setNeutral(neutral + 1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={setFeedback('good')} text='good' />
      <Button onClick={setFeedback('neutral')} text='neutral' />
      <Button onClick={setFeedback('bad')} text='bad' />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)