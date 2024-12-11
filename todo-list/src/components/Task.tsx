import TaskProps from "../models/TaskProps"

const Task: React.FC<TaskProps>=({task})=>{
    const priorityMap = {
        high: 'Alta',
        medium: 'Media',
        low: 'Baja'
      };
    
    const categoryMap = {
        work: 'trabajo',
        personal:'personal', 
        study:'esudio'
    };
    
    return(
        <>
             {task.map((tarea)=>(
                 <tr key={tarea.id}>
                    <td>{tarea.id}</td>
                    <td>{tarea.completed? 'YES':'NOT'}</td>
                    <td>{tarea.title}</td>
                    <td>{tarea.description}</td>
                    <td>{new Date(tarea.dueDate).toLocaleDateString()}</td>
                    <td>{priorityMap[tarea.priority]}</td>
                    <td>{categoryMap[tarea.category]}</td>
                    <td>{new Date(tarea.createdAt).toLocaleDateString()}</td>
                    <td><button>Edit</button> <button>Delete</button></td>
                </tr>
                    ))}    
        </>
    )
}

export default Task