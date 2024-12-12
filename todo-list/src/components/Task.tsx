import TaskProps from "../models/TaskProps"

const Task: React.FC<TaskProps>=({task,onDelete,onUpdatebox})=>{
    const priorityMap = {
        high: 'Alta',
        medium: 'Media',
        low: 'Baja'
      };
    
    const categoryMap = {
        work: 'Trabajo',
        personal:'Personal', 
        study:'Estudio'
    };
 

    
    return(
        <>
             {task.map((tarea)=>(
                 <tr key={tarea.id}>
                     <td><input type="checkbox" checked={tarea.completed} onChange={()=>onUpdatebox&&onUpdatebox(tarea.id,tarea.completed)}></input></td>
                    <td>{tarea.id}</td>
                    <td>{tarea.title}</td>
                    <td>{tarea.description}</td>
                    <td>{new Date(tarea.dueDate).toLocaleDateString()}</td>
                    <td>{priorityMap[tarea.priority]}</td>
                    <td>{categoryMap[tarea.category]}</td>
                    <td>{new Date(tarea.createdAt).toLocaleDateString()}</td>
                    <td><button>Edit</button> <button onClick={()=>onDelete && onDelete(tarea.id)}>Delete</button></td>
                </tr>
                    ))}    
        </>
    )
}

export default Task