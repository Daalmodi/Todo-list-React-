import {  useEffect, useReducer } from 'react';
import Tasks from './components/Tasks';
import taskReducer from './reducers/taskReducer';
import StateModel from './models/StateModel';
import TaskModel from './models/TaskModel';
import { ADD, DELETE, GET, UPDATE } from './reducers/actions';
import getTasks from './api/getTasks';
import './App.css'
import createTask from './api/createTask';
import AddTask from './components/AddTask';
import deleteTask from './api/deleteTask';
import updateTaskBox from './api/updateTaskBox';




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
    console.log(task);
    
    
  }

  const checkBoxHandle =async(id:string,box:boolean)=>{
    if(box===true){
      box=false
    }else{
      box=true
    }
   if(await updateTaskBox(id,box)){

    dispatch({type:UPDATE,id,box})
    
   }
    
    
  }

  return (
    <div>
      <AddTask onCreateTask={ceateTask}></AddTask>
      <Tasks task={state.tasks}  oneDeleteTask={ondeDeleteHandler} oneUpdateTask={onUpdateHandle} onUpdatebox={checkBoxHandle}></Tasks>
      
    </div>
  )
};
export default App
