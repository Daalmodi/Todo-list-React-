import TaskProps from "../models/TaskProps"
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import UpdateTask from "./UpdateTask";
import TaskModel from "../models/TaskModel";

const Task: React.FC<TaskProps>=({task,onDelete,onUpdatebox,onUpdateTask})=>{
    const [show, setShow] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState("");
    const [updatedTask, setUpdatedTask] = useState<TaskModel | null>(null);
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
 
const handleEdit =(taskId:string)=>{
    setSelectedTaskId(taskId);
    setShow(true);

}

const onUpdate = (task:TaskModel) => {
    
    
    
    setUpdatedTask({ ...task });
  };

  const handleSaveTask =()=>{
        
        
    if (onUpdateTask && updatedTask !== null) {
        onUpdateTask(updatedTask);
      }

   setShow(false);
}
    
    return(
        <>
             {task.map((tarea)=>(
                 <tr key={tarea.id}>
                     <td><input type="checkbox" checked={tarea.completed} onChange={()=>onUpdatebox&&onUpdatebox(tarea.id,tarea.completed)}></input></td>
                    <td>{tarea.id}</td>
                    <td>{tarea.title}</td>
                    <td>{tarea.description}</td>
                    <td>{new Date(tarea.dueDate).toISOString().split('T')[0]}</td>
                    <td>{priorityMap[tarea.priority]}</td>
                    <td>{categoryMap[tarea.category]}</td>
                    <td>{new Date(tarea.createdAt).toISOString().split('T')[0]}</td>
                    <td>
                    <Button variant="primary" onClick={()=>handleEdit(tarea.id)}>Edit</Button>
                        <button onClick={()=>onDelete && onDelete(tarea.id)}>Delete</button>
                    </td>

                </tr>
                    ))}

                    <Modal show={show} onHide={()=>setShow(false)}> 
                        <Modal.Header closeButton>
                            <Modal.Title>Editar Tarea</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <UpdateTask  task={task} idUpdate={selectedTaskId} onUpdate={onUpdate}></UpdateTask>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={()=>setShow(false)}>Close</Button>
                            <Button variant="primary" onClick={()=>handleSaveTask()}>Save Changes</Button>
                        </Modal.Footer>
                    </Modal>   
 
        </>
    )
}

export default Task