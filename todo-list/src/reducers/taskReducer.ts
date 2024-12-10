
import ActionModel from "../models/ActionModel";
import StateModel from "../models/StateModel";
import { GET } from "./actions";


const taskReducer=(state:StateModel,action:ActionModel):StateModel =>{
    switch(action.type){
        case GET:
            return {
                ...state,
                tasks:action.tasks? [...action.tasks]:[]
            };
        default:
            return state;
    }
};
export default taskReducer;