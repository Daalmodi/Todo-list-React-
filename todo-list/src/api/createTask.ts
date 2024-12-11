import axios from "axios";
import TaskModel from "../models/TaskModel";
import { v4 as uuidv4 } from 'uuid';
const createTask = async (task:TaskModel)=>{
    try {
        const newTask={
            id: uuidv4(),
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            priority: task.priority,
            category: task.category,
            completed: task.completed,
            createdAt: new Date().toISOString()
        };
        const result = await axios.post("http://localhost:3000/tasks",newTask);
        if(result.status === 201){
            return result.data;
        }
    } catch (error) {
        console.log("Hubo un error de la creacion de la tarea:" +error);
        
    }

}
export default createTask;