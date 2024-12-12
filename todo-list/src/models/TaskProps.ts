import TaskModel from "./TaskModel";

interface TaskProps {
    task: TaskModel[];
    oneDeleteTask?:(id:string)=>void;
    onDelete?:(id:string)=>void;
    oneUpdateTask?:(task:TaskModel)=>void;
    onUpdate?:(task:TaskModel)=>void;
    onUpdatebox?:(id:string,checkbox:boolean)=>void;
  }
export default TaskProps;

