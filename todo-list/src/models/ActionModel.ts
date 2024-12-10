import TaskModel from "./TaskModel";

interface ActionModel {
    type: string;
    tasks?: TaskModel[];
  }
export default ActionModel;