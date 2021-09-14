import React,{useState,useEffect} from 'react';
import Task from './Task';
import {Droppable} from 'react-beautiful-dnd';
import "../App.css";

const List=(props)=>{
    const[data,setData]=useState({...props.list});
    useEffect(() => {
        setData({...props.list}); 
    }, [props])

    return(
        
      <div className="list_div">
          <div className="list_header">
               <h4>{data.name}</h4>
               <p onClick={()=>props.deleteList(props.id)}><i class="fas fa-times"></i></p>
          </div>
          <Droppable droppableId={data.name+"_"+props.id}>
              { (provided)=>(
            <div  ref={provided.innerRef} {...provided.droppableProps} className="task_container">
              {
                  props.list.tasks.map((task,id)=>{
                    return <Task task={task} key={id} deleteTask={props.deleteTask} listId={props.id}  taskId={id} listName={data.name}/> 
                  })
              }
               {provided.placeholder}
             </div>
            )}
          </Droppable>
          <div className="addTask_div">
              <button onClick={()=>props.taskModal(props.id)}><i className="fas fa-plus-circle"></i></button>
          </div>
      </div>
    );
}
export default List;