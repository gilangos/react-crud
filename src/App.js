import './App.css';
import List from './components/list';

import { useState,useEffect, useCallback} from "react";
import { BsTrashFill,BsBookmarkCheck, BsBookmarkCheckFill} from "react-icons/bs";
import Relogio from './components/relogio';

const API = "http://localhost:5000"

function App() {

  const [title,settitle] = useState("")
  const [time,settime] = useState("")
  const [todos, settodos] = useState([])
  const [loading, setloading] = useState(false)
  const [state, setstate] = useState(true)

  

  const createid = (array)=>{
      if(!array.length) return 1

      let lastid = array[array.length - 1].id + 1
      return lastid;
  }


  useEffect(()=>{

    setloading(true)

    const loaddata =()=>{

      setTimeout(() => {
        
        fetch(API + '/todos')
          .then(res=> res.json())
          .then(data => settodos(data))
          .catch(e=> console.log(e))

        setloading(false)
        
      }, 500);
      
    }

    loaddata()
  },[])

 

  const handleSearch = async(title)=>{
    
    const resp = await fetch(API + '/todos')
    const data = await resp.json()
    
    if(!title){
      settodos(data)
      return
    }
    
    settodos(prev=> prev.filter(item => item.title.includes(title)))
  }



  const handlesubmit = async (e)=>{
      e.preventDefault()

      console.log(title)
      console.log(time)
      
      const todo = {
        id: createid(todos),
        title,
        time,
        done: false,
      }

      await fetch(API + "/todos", {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
          "Content-Type": "application/json",
        },
      })

      settodos(prev=> [...prev,todo])
      settitle("");
      settime("");

  }
  
  const handleremove = async (id) =>{

    await fetch(API + `/todos/${id}`,{
      method: "DELETE",
    });


    console.log(todos.filter(todo => todo.id != id))

    settodos(prev => prev.filter(todo=> todo.id != id))

  }
  

 const handlEdit = async(todo) =>{

    todo.done = !todo.done

    const data = await fetch(API + "/todos/" + todo.id, {
      method: 'PUT',
      body: JSON.stringify(todo),
      headers:{
        "content-type" : "application/json",
      }
    })
      
    settodos(prev => prev.map((ele) => ele.id == data.id ? ele = data : ele))
  
 }

 if(loading){
  return <h1>Carregando dados...</h1>
 }
 
  return (
    <div className="App">
      <div className="todo-header">
        <h1>React CRUD</h1>
      </div>
      <div className="form-todo">
        <h2>insira sua proxima tarefa:</h2>
        <form onSubmit={handlesubmit}>
          <div className="form-control">
            <label htmlFor="title">o que vc vai fazer?</label>
            <input 
              type="text" 
              name="title" 
              placeholder='titulo da tarefa'
              onChange={(e)=> settitle(e.target.value)}
              value={title || ""}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="time">Duração:</label>
            <input 
              type="text" 
              name="time" 
              placeholder='tempo estimado(em horas)'
              onChange={(e)=> settime(e.target.value)}
              value={time || ""}
              required
            />
          </div>
          <button type="submit">Enviar Tarefa</button>
        </form>
        <div className="search-container">
          <input 
          type="text" 
          name="search"
          placeholder='search'
          onChange={(e)=> handleSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="list-todo">
        <h2>lista de tarefas:</h2>
       
        {todos.length === 0 && <p> não ha tarefas!</p>}
        {!loading ? <p className="pik">dados carregados</p> : <p className="pik">carregandos dados...</p>}
        {/* {todos.map((todo,index)=>(
          <div className={index === 0 ? 'todo select' : 'todo'} key={todo.id}>
            <h3 className={todo.done ? "todo-done" : null}>{todo.title}</h3>
            <p>duração: {todo.time}</p>
            <div className="actions">
              <span onClick={()=> handlEdit(todo)}>
                {!todo.done ? <BsBookmarkCheck/> : <BsBookmarkCheckFill/> }
              </span>
              <BsTrashFill onClick={()=> handleremove(todo.id)}/>
            </div> 
          </div>
        ))} */}
        <List todos={todos} handleremove={handleremove} handlEdit={handlEdit}/>
      </div>
      {/* <button  onClick={()=>setstate(prev=> !prev)}>click</button> */}
      <Relogio state={state}/>
    </div>
  );
}

export default App;
