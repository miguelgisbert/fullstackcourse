import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const Button = ({type}) => {
      if (type === "good") {
        return <button onClick={() => setGood(good + 1)}>good</button>
      }
      if (type === "neutral") {
        return <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      }
      if (type === "bad") {
        return <button onClick={() => setBad(bad + 1)}>bad</button>
      }
  }

  const StatisticLine = ({text, value}) => <p> {text} {value}</p>

  const Statistics = ({good, neutral, bad}) => {
    return (
      <>
      <h1>statistics</h1>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      {good !== 0 || neutral !== 0 || bad !== 0 ? 
      <div>
        <StatisticLine text="all" value={good + neutral + bad} />
        <StatisticLine text="average" value={(good - bad) / (good + neutral + bad)} />
        <StatisticLine text="possitive" value={good * 100 / (good + neutral + bad) + " %"} />
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
      <Button type="good"/>
      <Button type="neutral"/>
      <Button type="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad} />
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
