import TaskProps from "../models/PropsModel"

const Task: React.FC<TaskProps>=({task})=>{
    return(
        <>
             {task.map((tarea)=>(
                 <tr key={tarea.id}>
                    <td>{tarea.id}</td>
                    <td>{tarea.completed? 'YES':'NOT'}</td>
                    <td>{tarea.title}</td>
                    <td>{tarea.description}</td>
                    <td>{new Date(tarea.dueDate).toLocaleDateString()}</td>
                    <td>{tarea.priority}</td>
                    <td>{tarea.category}</td>
                    <td>{new Date(tarea.createdAt).toLocaleDateString()}</td>
                    <td><button>Edit</button> <button>Delete</button></td>
                </tr>
                    ))}    
        </>
    )
}

export default Task