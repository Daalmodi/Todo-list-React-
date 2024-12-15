import TaskProps from "../models/TaskProps"
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import UpdateTask from "./UpdateTask";
import TaskModel from "../models/TaskModel";
import { Pencil, Trash } from 'react-bootstrap-icons';

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
             {task?.map((tarea)=>(
                 <tr key={tarea.id}>
                     <td className="checkbox"><input type="checkbox" checked={tarea.completed} onChange={()=>onUpdatebox&&onUpdatebox(tarea.id,tarea.completed)}></input></td>
                    
                    <td>{tarea.title}</td>
                    <td className="description">{tarea.description}</td>
                    <td >{new Date(tarea.dueDate).toISOString().split('T')[0]}</td>
                    <td >{priorityMap[tarea.priority]}</td>
                    <td>{categoryMap[tarea.category]}</td>
                    <td>{new Date(tarea.createdAt).toISOString().split('T')[0]}</td>
                    <td className="actions">
                        <Pencil className="pensil" onClick={() => handleEdit(tarea.id)} />
                        <Trash className="trash" onClick={() => onDelete && onDelete(tarea.id)} />
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
                            <Button variant="secondary" onClick={()=>setShow(false)}>Cerrar</Button>
                            <Button variant="primary" className="aplicar" onClick={()=>handleSaveTask()}>Aplicar</Button>
                        </Modal.Footer>
                    </Modal>   
 
        </>
    )
}

export default Task