import TaskModel from "./TaskModel";

interface ActionModel {
    type: string;
    task?: TaskModel[];
  }
export default ActionModel;