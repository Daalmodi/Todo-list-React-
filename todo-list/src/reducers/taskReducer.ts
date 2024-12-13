
import ActionModel from "../models/ActionModel";
import StateModel from "../models/StateModel";
import TaskModel from "../models/TaskModel";
import { ADD, DELETE, GET, UPDATE, UPDATE_STATE_TASK } from "./actions";


const taskReducer=(state:StateModel,action:ActionModel):StateModel =>{
    switch(action.type){
        case GET:
            return {
                ...state,
                tasks:action.task? [...action.task]:[]
            };
        case ADD:
            return{
                ...state,
                tasks: state.tasks.concat(action.task as TaskModel[])
            };
        case DELETE:
            
        if (!action.id) {
            return state;
          }
          return {
            ...state,
            tasks: state.tasks.filter((task) => task.id !== action.id),
          };
        case UPDATE_STATE_TASK:
            return{
                ...state,
                tasks: state.tasks.map((task)=>{
                    if(task.id === action.id){
                        return{...task,completed:action.completed ?? false}
                    }
                return task;
                }),
            };
        case UPDATE:
            return{
                ...state,
                tasks: state.tasks.map((task)=>{
                    console.log(task.id);
                    
                    if(task.id === action.id){
                        return{...task,
                            title: action.title ?? task.title,
                            description: action.description ?? task.description,
                            dueDate: action.dueDate ? new Date(action.dueDate): task.dueDate,
                            priority: action.priority  as "high" | "medium" | "low",
                            category: action.category as "work"|"personal"|"study",
                            completed: action.completed ?? task.completed,
                        }
                    }
                return task;
                })
            }  
            
        default:
            return state;
    }
};
export default taskReducer;