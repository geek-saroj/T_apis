"use client"
import {useState} from "react";

export default function Home() {
const [todos , setTodos] = useState([]);
const [input , setInput] = useState('');

const handleChange = (e) => {
if (e.target.value =='') {
  return alert('please add a todo')
}
setInput(e.target.value)


}

// console.log(input)
const handleClick = (e) => {
  e.preventDefault();
  setTodos([...todos , input]);
  setInput('');
  
}



  return (
   <>
   <form>
   <input type="text"  onChange={handleChange}  ></input>
  
   <button onClick={handleClick} >add</button>
   <ul>
    
    {todos.map((todo) => {
      return <li>{todo}</li>
    })}
    
   </ul>
   </form>
   </>
  );
}
