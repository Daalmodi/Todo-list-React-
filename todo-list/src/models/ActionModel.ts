import TaskModel from "./TaskModel";

interface ActionModel {
    type: string;
    task?: TaskModel[];
    id?:string;
    title?:string;
    description?:string;
    dueDate?:string;
    priority?:"high" | "medium" | "low";
    category?: "work" |"personal"|"study";
    completed?:boolean;

  }
export default ActionModel;