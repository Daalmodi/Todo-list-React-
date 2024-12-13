import TaskModel from "./TaskModel";

interface TaskProps {
    task: TaskModel[];
    idUpdate?: string;
    oneDeleteTask?:(id:string)=>void;
    onDelete?:(id:string)=>void;
    onUpdate?:(task:TaskModel)=>void;
    onUpdateTask ?:(task:TaskModel)=>void;
    onUpdatebox?:(id:string,checkbox:boolean)=>void;
  }
export default TaskProps;

