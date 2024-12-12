import TaskModel from "./TaskModel";

interface ActionModel {
    type: string;
    task?: TaskModel[];
    id?:string;
    box?:boolean;
  }
export default ActionModel;