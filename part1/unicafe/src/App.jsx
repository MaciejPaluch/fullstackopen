import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good+1)} text="good" />
      <Button onClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button onClick={() => setBad(bad+1)} text="bad" />
      <h2>statistics</h2>
      <Statistics arg1={good} arg2={neutral} arg3={bad}/>
    </div>
  )
}

const Button = (props) => (  
  <button onClick={props.onClick}>{props.text}</button>
)

const StatisticLine = (props) => (
  <tr>
    <td>{props.name}</td>
    <td>{props.counter}</td>
  </tr>
)


const Statistics = (props) => {
  let lacznie= props.arg1 + props.arg2 + props.arg3
  if (lacznie === 0){
    return(
    <p>No data has been collected</p>
    )
  }
  return(
    <table>
      <tbody>
        <StatisticLine name ="good" counter={props.arg1}/>
        <StatisticLine name ="neutral" counter={props.arg2}/>
        <StatisticLine name ="bad" counter={props.arg3}/>
        <StatisticLine name ="average" counter={(props.arg1-props.arg3)/lacznie}/>
        <StatisticLine name ="positive" counter={((props.arg1)/lacznie)*100+" %"}/>
      </tbody>
    </table>

  ) 
}


export default App