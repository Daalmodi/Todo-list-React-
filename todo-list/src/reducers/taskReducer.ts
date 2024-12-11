
import ActionModel from "../models/ActionModel";
import StateModel from "../models/StateModel";
import TaskModel from "../models/TaskModel";
import { ADD, GET } from "./actions";


const taskReducer=(state:StateModel,action:ActionModel):StateModel =>{
    switch(action.type){
        case GET:
            return {
                ...state,
                tasks:action.task? [...action.task]:[]
            };
        case ADD:
            console.log('action.task:', action.task);
            return{
                ...state,
                tasks: state.tasks.concat(action.task as TaskModel[])
            };
        default:
            return state;
    }
};
export default taskReducer;