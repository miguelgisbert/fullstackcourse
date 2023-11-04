import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const Statistics = ({good, neutral, bad}) => {
    return (
      <>
      <h1>statistics</h1>
      {good !== 0 || neutral !== 0 || bad !== 0 ? 
      <div>
        <p>all {good + neutral + bad}</p>
        <p>average {(good - bad) / (good + neutral + bad)}</p>
        <p>possitive {good * 100 / (good + neutral + bad)} %</p>
      </div> 
      :
      <div>
        <p>No feedback given</p>
      </div>}
      </>
    )
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
