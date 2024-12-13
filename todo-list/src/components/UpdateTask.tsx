
import React, { useState  } from "react";
import TaskProps from "../models/TaskProps";
import Form from 'react-bootstrap/Form';
const UpdateTask:React.FC<TaskProps>=({task,idUpdate,onUpdate})=>{
    
    const taskToUpdate = task.find((t) => t.id === idUpdate);
    
    const[title,setTitle] =useState(taskToUpdate?.title);
    const[description,setdescription] =useState(taskToUpdate?.description);
    const[dueDate,setDueDate] =useState<string>(taskToUpdate?.dueDate ? new Date(taskToUpdate.dueDate).toISOString().split('T')[0] : '');
    const[priority,setPriority] =useState(taskToUpdate?.priority);
    const[category,setCategory] =useState(taskToUpdate?.category);
    const[completed,setCompleted] =useState(taskToUpdate?.completed);
    
    if (!taskToUpdate) return null;

      

    
    const handleUpdate = async()=>{
        console.log(dueDate);
        
        const  updatedTask = {
            id: taskToUpdate.id,
            title:title ?? taskToUpdate.title,
            description:description ?? taskToUpdate.description,
            dueDate:new Date(dueDate),
            priority:priority ?? taskToUpdate.priority,
            category:category ?? taskToUpdate.category,
            completed:completed ?? taskToUpdate.completed,
            createdAt: taskToUpdate.createdAt,
          };
          if (onUpdate) {  
             onUpdate(updatedTask);
          }
      

    }
    
    
    return(
        <>

        <Form>
            {/* Campo para el título */}
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Título</Form.Label>
                <Form.Control   type="text" placeholder="Ingrese el título" required  onChange={(event) => {setTitle(event.target.value);}} onBlur={handleUpdate}
                value={title}
                />
            </Form.Group>
            {/* Campo para la descripción */}
            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Descripción</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Ingrese la descripción" required   value={description} onChange={(event)=>{setdescription(event.target.value);}} onBlur={handleUpdate}/> 
            </Form.Group>

            {/* Campo para la fecha de vencimiento */}
            <Form.Group className="mb-3" controlId="dueDate">
                <Form.Label>Fecha de Vencimiento</Form.Label>
                <Form.Control
                 type="date" 
                 required 
                 value={dueDate ? dueDate.split('T')[0] : ''}
                 onChange={(event)=>{setDueDate(event.target.value);}}
                 onBlur={handleUpdate}
                 />
            </Form.Group>

            {/* Campo para la prioridad */}
            <Form.Group className="mb-3" controlId="priority">
                <Form.Label>Prioridad</Form.Label>
                <Form.Select required value={priority} onChange={(event)=>{setPriority(event.target.value as "high" | "medium" | "low"); }} onBlur={handleUpdate}>
                <option value="">Seleccione una prioridad</option>
                <option value="high">Alta</option>
                <option value="medium">Media</option>
                <option value="low">Baja</option>
                </Form.Select>
            </Form.Group>

            {/* Campo para la categoría */}
            <Form.Group className="mb-3" controlId="category">
                <Form.Label>Categoría</Form.Label>
                <Form.Select required value={category} onChange={(event)=>{setCategory(event.target.value as "work"|"personal"|"study");}} onBlur={handleUpdate}>
                <option value="">Seleccione una categoría</option>
                <option value="work">Trabajo</option>
                <option value="personal">Personal</option>
                <option value="study">Estudio</option>
                </Form.Select>
            </Form.Group>

            {/* Campo para indicar si está completado */}
            <Form.Group className="mb-3" controlId="completed">
                <Form.Check type="checkbox" label="¿Completado?"  checked={completed} onChange={(event)=>{setCompleted(event.target.checked);}} onBlur={handleUpdate}/>
            </Form.Group>

        </Form>


        
        </>
    )
}

export default UpdateTask;