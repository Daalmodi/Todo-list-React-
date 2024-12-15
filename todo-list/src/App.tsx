import {  useEffect, useReducer, useState } from 'react';
import Tasks from './components/Tasks';
import taskReducer from './reducers/taskReducer';
import StateModel from './models/StateModel';
import TaskModel from './models/TaskModel';
import { ADD, DELETE, GET, UPDATE, UPDATE_STATE_TASK } from './reducers/actions';
import getTasks from './api/getTasks';
import createTask from './api/createTask';
import AddTask from './components/AddTask';
import deleteTask from './api/deleteTask';
import updateTaskBox from './api/updateTaskBox';
import updateTask from './api/updateTask';
import Filter from './components/Filter';
import FilterContext from './context/FilterContext';
import FilterState from './models/FilterState';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
function App() {
  const initialState: StateModel = {
    tasks: [],
  };
 
  const [state,dispatch]=useReducer(taskReducer,initialState);
  
  const [globalFilter,setglobalFilter] = useState<FilterState>({
    status: undefined,
    priority: undefined,
    category: undefined,
    searchTerm: "",
    dueDateOrder:""
  });

  useEffect(()=>{
    const storedFilter = localStorage.getItem("FILTRO");
    if (storedFilter) {
      const filter: FilterState = JSON.parse(storedFilter);
      setglobalFilter(filter);
    } 
  } 
  ,[]);
  
  useEffect(()=>{
    const loadTask = async() => {
      const taskData:TaskModel[] = await getTasks();
      handlefilter(taskData);
    };
    
    loadTask();
  } ,[globalFilter]);

  const onCreateHandler = async(taskInfo:TaskModel) =>{
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

 const handlefilter =(task:TaskModel[])=>{
   let filteredTasks: TaskModel[]=task;
  
  
   
   const lastFilter = { ...globalFilter };

    lastFilter.status = globalFilter.status;
    switch(globalFilter.status){
      case 'all':
      
        break;
      case 'completed':
        filteredTasks = filteredTasks.filter((tarea) => tarea.completed === true);
        break;
      case 'pending':
        filteredTasks = filteredTasks.filter((tarea) => tarea.completed === false);
        break;
    };
  
  
    lastFilter.priority = globalFilter.priority;
    switch(globalFilter.priority){
      case 'all':
        
        break;
      case 'high':
        filteredTasks = filteredTasks.filter((tarea) => tarea.priority === 'high');
        break;
      case 'medium':
        filteredTasks = filteredTasks.filter((tarea) => tarea.priority === 'medium');
        break;
        case 'low':
          filteredTasks = filteredTasks.filter((tarea) => tarea.priority === 'low');
          break;
    };
  

 
    lastFilter.category = globalFilter.category;
    switch(globalFilter.category){
      case 'all':
        
        break;
      case 'work':
        filteredTasks = filteredTasks.filter((tarea) => tarea.category === 'work');
        break;
      case 'personal':
        filteredTasks = filteredTasks.filter((tarea) => tarea.category === 'personal');
        break;
        case 'study':
          filteredTasks = filteredTasks.filter((tarea) => tarea.category === 'study');
          break;
    };

    lastFilter.dueDateOrder = globalFilter.dueDateOrder;
    switch(globalFilter.dueDateOrder){
      case 'default':
        
        break;
      case 'upward':
        filteredTasks = filteredTasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
        break;
      case 'falling':
        filteredTasks = filteredTasks.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
        break;
    };
  
  
    lastFilter.searchTerm = globalFilter.searchTerm;
    switch(globalFilter.searchTerm){
      case '':
        
        break;
      default:
        filteredTasks = filteredTasks.filter((tarea) => tarea.title.toLowerCase().includes(globalFilter.searchTerm.toLowerCase()) || tarea.description.toLowerCase().includes(globalFilter.searchTerm.toLowerCase()));
        break;
    };
  

  localStorage.setItem("FILTRO", JSON.stringify(lastFilter));
  dispatch({type: GET,task:filteredTasks});


 } 

  return (

    
      <Container fluid >
        <FilterContext.Provider value={{globalFilter,setglobalFilter}}>
          <Row>
            <Col xs={12} md={4} lg={3} >
              <div className='newTask'>
                <AddTask onCreateTask={onCreateHandler} ></AddTask>
                <Filter></Filter>
              </div>
            </Col>
            <Col xs={12} md={8} lg={9} className='taskComponet'>
              <Tasks task={state.tasks}  oneDeleteTask={ondeDeleteHandler} onUpdateTask={onUpdateHandle} onUpdatebox={checkBoxHandle}></Tasks>  
            </Col>
          </Row>
        </FilterContext.Provider>
      </Container>
    
  )
};
export default App;
