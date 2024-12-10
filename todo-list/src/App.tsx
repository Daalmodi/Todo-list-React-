import {  useEffect, useReducer } from 'react';
import Tasks from './components/Tasks';
import taskReducer from './reducers/taskReducer';
import StateModel from './models/StateModel';
import TaskModel from './models/TaskModel';
import { GET } from './reducers/actions';
import getTasks from './api/getTasks';
import './App.css'

function App() {

  const initialState: StateModel = {
    tasks: [],
  };
 
  const [state,dispatch]=useReducer(taskReducer,initialState);

  useEffect(()=>{
    const loadTask = async() => {
      const taskData:TaskModel[] = await getTasks();
      
      dispatch({ type: GET, tasks: taskData });
    };
    
    loadTask();
  } 
  ,[]);

  const ceateTask = ()=>{
    console.log("entro");
  }

  return (
    <div>
      <h1></h1>
      <Tasks task={state.tasks}></Tasks>
      <button onClick={ceateTask}>+</button>
    </div>
  )
};
export default App
