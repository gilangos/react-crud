import { BsBookmarkCheck, BsBookmarkCheckFill, BsTrashFill } from "react-icons/bs";
import { useEffect } from "react";

const List = ({todos, handleremove, handlEdit})=>{

    return(
        <>
            {todos.map((todo,index)=>(
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
            ))}
        </>
    )
}


export default List;