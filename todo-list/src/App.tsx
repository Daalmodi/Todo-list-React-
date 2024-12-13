import {  useEffect, useReducer } from 'react';
import Tasks from './components/Tasks';
import taskReducer from './reducers/taskReducer';
import StateModel from './models/StateModel';
import TaskModel from './models/TaskModel';
import { ADD, DELETE, GET, UPDATE, UPDATE_STATE_TASK } from './reducers/actions';
import getTasks from './api/getTasks';
import './App.css'
import createTask from './api/createTask';
import AddTask from './components/AddTask';
import deleteTask from './api/deleteTask';
import updateTaskBox from './api/updateTaskBox';
import updateTask from './api/updateTask';


//Modal




function App() {
 

 
  
  const initialState: StateModel = {
    tasks: [],
  };
 
  const [state,dispatch]=useReducer(taskReducer,initialState);

  useEffect(()=>{
    const loadTask = async() => {
      const taskData:TaskModel[] = await getTasks();
      
      dispatch({ type: GET, task: taskData });
    };
    
    loadTask();
  } 
  ,[]);

  const ceateTask = async(taskInfo:TaskModel) =>{
   const taskData:TaskModel[] = await createTask(taskInfo);
   dispatch({type: ADD,task:taskData});
    
  }

  const ondeDeleteHandler = async(id:string)=>{
    if(await deleteTask(id)){
      dispatch({type:DELETE,id});
    }
  }

  const onUpdateHandle = async(task:TaskModel)=>{
    const id = task.id;
    const title =task.title;
    const description = task.description;
    const dueDate = task.dueDate.toISOString().split('T')[0];
    const priority = task.priority;
    const category = task.category;
    const completed = task.completed;

    if(await updateTask(id,task)){
  
      
      dispatch({type:UPDATE,id,title,description, dueDate,priority,category,completed})
      
    }
    
  }

  const checkBoxHandle =async(id:string,completed:boolean)=>{
    if(completed===true){
      completed=false
    }else{
      completed=true
    }
   if(await updateTaskBox(id,completed)){

    dispatch({type:UPDATE_STATE_TASK,id,completed})
    
   }
    
    
  }

  return (
    <div>
      <AddTask onCreateTask={ceateTask}></AddTask>
      <Tasks task={state.tasks}  oneDeleteTask={ondeDeleteHandler} onUpdateTask={onUpdateHandle} onUpdatebox={checkBoxHandle}></Tasks>


      

    </div>
  )
};
export default App
