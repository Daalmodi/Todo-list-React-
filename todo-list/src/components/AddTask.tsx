import { useState } from "react";
import TaskModel from "../models/TaskModel";

import AddTaskProps from "../models/AddTaskProps";


const AddTask : React.FC<AddTaskProps>=({onCreateTask})=>{
    const [task, setTask] = useState<TaskModel>({
        id: "",
        title: "",
        description: "",
        dueDate: new Date(),
        priority: "low",
        category: "personal",
        completed: false,
        createdAt: new Date(),
      });
    

    const handleSubmit= (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        onCreateTask(task);
        
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setTask({ ...task, [name]: value });
      };

      const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTask({ ...task, [name]: new Date(value) });
      };

return(
    <>
        <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type="text"
            value={task.title}
            onChange={handleChange}
            name="title"
            placeholder="Escribe el título de la tarea"
          />
        </label>
        <br />
        <label>
          Descripción:
          <textarea
            value={task.description}
            onChange={handleChange}
            name="description"
            placeholder="Escribe la descripción de la tarea"
          />
        </label>
        <br />
        <label>
          Fecha límite:
          <input
            type="date"
            value={task.dueDate.toISOString().split("T")[0]}
            onChange={handleDateChange}
            name="dueDate"
          />
        </label>
        <br />
        <label>
          Prioridad:
          <select
            value={task.priority}
            onChange={handleChange}
            name="priority"
          >
            <option value="high">Alta</option>
            <option value="medium">Media</option>
            <option value="low">Baja</option>
          </select>
        </label>
        <br />
        <label>
          Categoría:
          <select
            value={task.category}
            onChange={handleChange}
            name="category"
          >
            <option value="work">Trabajo</option>
            <option value="personal">Personal</option>
            <option value="study">Estudio</option>
          </select>
        </label>
        <br />
        <button>Añadir</button>
      </form>
      
    </>
)

}
export default AddTask;