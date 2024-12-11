import {  useEffect, useReducer } from 'react';
import Tasks from './components/Tasks';
import taskReducer from './reducers/taskReducer';
import StateModel from './models/StateModel';
import TaskModel from './models/TaskModel';
import { ADD, GET } from './reducers/actions';
import getTasks from './api/getTasks';
import './App.css'
import createTask from './api/createTask';
import AddTask from './components/AddTask';

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
    console.log(taskData);
    
  }

  return (
    <div>
      <AddTask onCreateTask={ceateTask}></AddTask>
      <Tasks task={state.tasks}></Tasks>
      
    </div>
  )
};
export default App
