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

export default Course