import React,{useState,useEffect}from 'react';
import List from './List';
import { DragDropContext} from 'react-beautiful-dnd';

const MainSection=()=>{
    const [listName,setListName]=useState("");
    const [listId,setListId]=useState();
    const [showModal,setShowModal]=useState(false);
    const [showListModal,setShowListModal]=useState(false);
    const [showTaskModal,setShowTaskModal]=useState(false);
    const [listData,setListData]=useState([]);
    const [task,setTask]=useState({
      title:"",
      desc:"",
      time:"",
    });

    useEffect(()=>{
     JSON.parse(localStorage.getItem("trello_task"))!==null?
     setListData(JSON.parse(localStorage.getItem("trello_task"))):
     setListData([]);
      },[])
  

    const getListName=(e)=>{
      setListName(e.target.value);
    }

    const createList=()=>{
      if(listName!=""){
       let tempData=JSON.parse(JSON.stringify(listData));
       tempData.push({
          name:listName,
          tasks:[],
       })
       localStorage.setItem("trello_task",JSON.stringify(tempData));
       setListData(tempData);
       setShowModal(false);
       setShowListModal(false);
       setListName("");
      }
    }

    const deleteList=(id)=>{
      if(window.confirm("Are you sure, you want to delete")){
       let tempData=JSON.parse(JSON.stringify(listData));
       tempData.splice(id,1);
       localStorage.setItem("trello_task",JSON.stringify(tempData));
       setListData(tempData);

      }
    }

    const taskModal=(listId)=>{
      setShowModal(true);
      setShowTaskModal(true);
      setListId(listId);
    }

    const getTaskData=(e)=>{
     if(e.target.name==="title"){
        setTask({...task,title:e.target.value,time:new Date().toLocaleString()});

     }
     else{
      setTask({...task,desc:e.target.value,time:new Date().toLocaleString()});
     }
    }

    const createTask=()=>{
      if(task.title!="" && task.desc!=""){
       let tempData=JSON.parse(JSON.stringify(listData));
       tempData[listId].tasks.unshift(task);
       setShowModal(false);
       setShowTaskModal(false);
       setListData(tempData);
       localStorage.setItem("trello_task",JSON.stringify(tempData));
       setTask({...task,title:"",desc:"",time:""});
      }
    }

    const deleteTask=(listId,taskId)=>{
      if(window.confirm("Are you sure,you want to delete")){
       let tempData=JSON.parse(JSON.stringify(listData));
       tempData[listId].tasks.splice(taskId,1)
       setListData(tempData);
       localStorage.setItem("trello_task",JSON.stringify(tempData));
      }
    }
  
    const handleDragEnd=(res)=>{
      if(!res.destination){
        return
      }
      if(res.destination.droppableId===res.source.droppableId){
        return;
      }
      if(res.destination){
             let start=Number(res.source.droppableId.split("_")[1]);
             let end=Number(res.destination.droppableId.split("_")[1]); 
             let startInd=Number(res.source.index);
             let endInd=Number(res.destination.index);

         let tempData=JSON.parse(JSON.stringify(listData));
         console.log(tempData);
         let [ele]=tempData[start].tasks.splice(startInd,1);
         tempData[end].tasks.splice(endInd,0,ele);
    
        //  sorting data
         tempData[end].tasks.sort((val1,val2)=>{
          return new Date(val2.time).getTime() - new Date(val1.time).getTime();
         });
         
  
         setListData(tempData);
         localStorage.setItem("trello_task",JSON.stringify(tempData));
       }
      }

    
    return(
    <>
      <div className="mainSection_div">
         <div className="addList_div">
             <button onClick={()=>{
               setShowModal(true);
               setShowListModal(true);
             }}>ADD</button>
         </div>
         <DragDropContext onDragEnd={(res)=>handleDragEnd(res)}>
          <div className="listSection_div">
            {
               listData.map((list,id)=>{
                    return (
                      <List list={list} id={id} deleteList={deleteList} deleteTask={deleteTask} taskModal={taskModal} key={id}/>
                    );
               })
            }
          </div>
         </DragDropContext>
       </div>

        <div className={showModal===true?"modalBg_div visible":"modalBg_div"} >
          {

            showListModal==true && showTaskModal==false 
            ?
            // list create modal
          <div className="modal">
             <div className="close_div">
                 <p onClick={()=>{
                   setShowModal(false);
                   setShowListModal(false);
                   }}><i className="fas fa-times"></i></p>
              </div>
               <div className="input_div">
                 <input type="text" value={listName} placeholder={"Enter list name"} onChange={getListName}></input>
               </div>
               <div className="submit_div">
                   <button onClick={createList}>Create</button>
               </div>
           </div>  
            :
            showListModal==false && showTaskModal==true
            ? 
            // Task create modal
           <div className="modal">
             <div className="close_div">
                 <p onClick={()=>{
                   console.log("hii");
                   setShowModal(false);
                   setShowTaskModal(false);
                   }}><i className="fas fa-times"></i></p>
              </div>
               <div className="input_div">
                 <input  type="text" value={task.title} name="title" placeholder={"Enter task name"} onChange={getTaskData}></input>
               </div>
               <div className="textarea_div">
                 <textarea  value={task.desc} placeholder={"Enter your task"} onChange={getTaskData}></textarea>
               </div>
               <div className="submit_div">
                   <button onClick={createTask}>Create</button>
               </div>
           </div> 
           :
           null
          } 
        </div> 
    </>

    );
}
export default MainSection;
