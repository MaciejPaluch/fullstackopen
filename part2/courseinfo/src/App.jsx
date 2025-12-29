const App = () => {
    const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course courses={courses} />
}

const Course = ({courses}) =>{
  return(
  <div>
  {courses.map(course=>(
    <div key={course.id}>
    <Header course={course}/>
    <Content course={course}/>
  </div>
  ))}
  </div>
  )
}
const Header = ({course})=>{
  return (
  <h1>{course.name}</h1>
  )
}

const Content = ({course})=>{
  return(
  <div>
    {course.parts.map(part=> <Part key ={part.id} part={part}/>)}
    <Sum lista={course.parts}/>
  </div>
  )
  
}

const Part =({part})=>{
  return(
  <p>{part.name} {part.exercises}</p>
  )
}

const Sum = ({lista}) =>{
  let totalAmount = lista.reduce(function(sum,item){
    return sum+item.exercises
  },0)
  return(
    <b>total of {totalAmount}</b>
  )
}


export default App