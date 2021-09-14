import React, { useEffect,useState } from 'react';
import "../App.css";
import {Draggable} from 'react-beautiful-dnd';

const Task=(props)=>{
    const[task,setTasks]=useState([]);

    useEffect(()=>{
     setTasks(props.task);
    },[props]);

    return(
        <Draggable draggableId={props.listName+props.taskId}   index={props.taskId}   key={props.listName+props.taskId}>
          {
             (provided)=>(
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="task_div">
                 <div className="task_header">
                     <h5>{task.title}</h5>
                      <p onClick={()=>props.deleteTask(props.listId,props.taskId)}><i class="fas fa-times"></i></p>
                 </div>
                <div className="task_desc">
                    <p>{task.desc}</p>
                </div>
                <div className="taskTime_div">
                    <h6>{task.time}</h6>
                </div>
         </div>
         )}
      </Draggable>
    );
}
export default Task;