import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',phone: '040-1234567'},
    { name: 'Ada Lovelace', phone: '39-44-5323523'},
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122'}

  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter , setFilter]= useState('')

  const addPerson = (event) =>{ 
    event.preventDefault()
    const personObject ={
      name : newName,
      phone : newPhone
    }
    let imiona = persons.map((person)=>person.name)
    if(imiona.includes(newName)){
      alert(`${newName} is already in phonebook`)
    }else{
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewPhone('')
  }
  const handleNoteChange1 = (event) => {
    setNewName(event.target.value)
  }
  const handleNoteChange2 = (event) => {
    setNewPhone(event.target.value)
  }
  const handleNoteChange3 = (event) => {
    setFilter(event.target.value)
  }
  const personsToShow = persons.filter(person => (person.name.includes(filter)))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleNoteChange3} />
      <h2>add a new</h2>
      <Form submit={addPerson} value1={newName} value2={newPhone} onChange1={handleNoteChange1} onChange2={handleNoteChange2}/>
      <h2>Numbers</h2>
      <Persons data={personsToShow}/>
      
    </div>
  )
}

const Note = ({ person }) => {
  return <li>{person.name} {person.phone }</li>
}

const Filter = ({ value, onChange }) => (
  <div>
    filter shown with <input value={value} onChange={onChange} />
  </div>
)

const Form = (props) =>(
  <form onSubmit={props.submit}>
    <div>
      name: <input value={props.value1} onChange={props.onChange1}/>
    </div>
    <div>number: <input value={props.value2} onChange={props.onChange2}/></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>    
)

const Persons = ({data})=>(
  <ul>
    {data.map((person) => (
      <Note key={person.name} person={person} />
    ))}
  </ul>
)


export default App