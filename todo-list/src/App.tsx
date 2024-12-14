import {  useEffect, useReducer, useState } from 'react';
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

import Filter from './components/Filter';
import FilterContext from './context/FilterContext';
import FilterState from './models/FilterState';
import usePrevious from './ref/usePrevious';



//Modal





function App() {
 


  
  const initialState: StateModel = {
    tasks: [],
  };
 
  const [state,dispatch]=useReducer(taskReducer,initialState);
  
  
  const [globalFilter,setglobalFilter] = useState<FilterState>({
    status: "all",
    priority: undefined,
    category: undefined,
    searchTerm: "",
    dueDateOrder:""
  });

  useEffect(()=>{
    const loadTask = async() => {
      const taskData:TaskModel[] = await getTasks();
      handlefilter(taskData);

      
    };
    
    loadTask();
  } 
  ,[globalFilter]);

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
  const previousFilter = usePrevious<FilterState>(globalFilter);
 const handlefilter =(task:TaskModel[])=>{
   let filteredTasks: TaskModel[]=[];
  
   const statusChanged = previousFilter?.status !== globalFilter.status;
   const priorityChanged = previousFilter?.priority !== globalFilter.priority;
   const categoryChanged = previousFilter?.category !== globalFilter.category;
   const dueDateOrderChanged = previousFilter?.dueDateOrder !== globalFilter.dueDateOrder;
   const searchTermChanged = previousFilter?.searchTerm !== globalFilter.searchTerm;


  if(statusChanged){
    switch(globalFilter.status){
      case 'all':
        filteredTasks = task;
        break;
      case 'completed':
        filteredTasks = task.filter((tarea) => tarea.completed === true);
        break;
      case 'pending':
        filteredTasks = task.filter((tarea) => tarea.completed === false);
        break;
    };
  }
  if(priorityChanged){

    switch(globalFilter.priority){
      case 'all':
        filteredTasks = task;
        break;
      case 'high':
        filteredTasks = task.filter((tarea) => tarea.priority === 'high');
        break;
      case 'medium':
        filteredTasks = task.filter((tarea) => tarea.priority === 'medium');
        break;
        case 'low':
          filteredTasks = task.filter((tarea) => tarea.priority === 'low');
          break;
    };
  }

  if(categoryChanged){

    switch(globalFilter.category){
      case 'all':
        filteredTasks = task;
        break;
      case 'work':
        filteredTasks = task.filter((tarea) => tarea.category === 'work');
        break;
      case 'personal':
        filteredTasks = task.filter((tarea) => tarea.category === 'personal');
        break;
        case 'study':
          filteredTasks = task.filter((tarea) => tarea.category === 'study');
          break;
    };
  }
  if(dueDateOrderChanged){

    switch(globalFilter.dueDateOrder){
      case 'default':
        filteredTasks = task;
        break;
      case 'upward':
        filteredTasks = task.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
        break;
      case 'falling':
        filteredTasks = task.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
        break;
    };
  }
  if(searchTermChanged){

    switch(globalFilter.searchTerm){
      case '':
        filteredTasks = task;
        break;
      default:
        filteredTasks = task.filter((tarea) => tarea.title.toLowerCase().includes(globalFilter.searchTerm.toLowerCase()) || tarea.description.toLowerCase().includes(globalFilter.searchTerm.toLowerCase()));
        break;
    };
  }


  dispatch({type: GET,task:filteredTasks});

 } 

  return (

    <div>
      <FilterContext.Provider value={{globalFilter,setglobalFilter}}>

        <AddTask onCreateTask={ceateTask}></AddTask>
        <Filter></Filter>
        <Tasks task={state.tasks}  oneDeleteTask={ondeDeleteHandler} onUpdateTask={onUpdateHandle} onUpdatebox={checkBoxHandle}></Tasks>  
      </FilterContext.Provider>
    </div>
  )
};
export default App;
