
import ActionModel from "../models/ActionModel";
import StateModel from "../models/StateModel";
import TaskModel from "../models/TaskModel";
import { ADD, DELETE, GET, UPDATE } from "./actions";


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
        case UPDATE:
            return{
                ...state,
                tasks: state.tasks.map((task)=>{
                    if(task.id === action.id){
                        return{...task,completed:action.box ?? false}
                    }
                return task;
                }),
            };
          
            
        default:
            return state;
    }
};
export default taskReducer;