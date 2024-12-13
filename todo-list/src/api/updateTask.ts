import axios from "axios";
import TaskModel from "../models/TaskModel";

const updateTask = async(id:string,task:TaskModel,)=>{
    try {
        const updatedTask={
            title:task.title,
            description:task.description,
            dueDate:task.dueDate,
            priority:task.priority,
            category:task.category,
            completed: task.completed
        };
        const result = await axios.patch(`http://localhost:3000/tasks/${id}`,updatedTask);
        if(result.status === 200){
            return result.data;
        }
    } catch (error) {
        console.log("No hubo conexion al backend "+error);
        return null;
    }
}
export default updateTask;