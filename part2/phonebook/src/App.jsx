import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter , setFilter]= useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const addPerson = (event) =>{ 
    event.preventDefault()
    const personObject ={
      name : newName,
      number : newPhone
    }
    let imiona = persons.map((person)=>person.name)
    if(imiona.includes(newName)){
      if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
        const id=(persons.find(person =>  person.name===personObject.name))?.id  
        personService.update(id, personObject).then(response => {
        setPersons(persons.map(person => person.id === id ? response : person))
})
      }
    }else{
      personService.create(personObject)
      .then(returnedPerson=>{
        setPersons(prev => prev.concat(returnedPerson))
        setNewName('')
        setNewPhone('')
      })
    }
    
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

  const handleDelete = (id,person) =>{
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.remove(id).then(() => {
      setPersons(prev => prev.filter(p => p.id !== id))
  })
  }}
  

  const personsToShow = persons.filter(person => (person.name.includes(filter)))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleNoteChange3} />
      <h2>add a new</h2>
      <Form submit={addPerson} value1={newName} value2={newPhone} onChange1={handleNoteChange1} onChange2={handleNoteChange2}/>
      <h2>Numbers</h2>
      <Persons data={personsToShow} handle={handleDelete}/>
      
    </div>
  )
}

const Note = ({ person, handle}) => {
  return <li>{person.name} {person.number} <Delete person = {person} id={person.id} handle={handle}/></li>
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

const Persons = ({data , handle})=>(
  <ul>
    {data.map((person) => (
      <Note key={person.id} person={person} handle={handle} />
    ))}
  </ul>
)

const Delete = ({id,handle, person})=>(
  <button onClick={() =>handle(id,person)}>delete</button>
)

export default App