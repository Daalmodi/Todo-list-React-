import { useState } from "react";
import TaskModel from "../models/TaskModel";
import Form from 'react-bootstrap/Form';
import AddTaskProps from "../models/AddTaskProps";
import { Button } from "react-bootstrap";


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
      <Form onSubmit={handleSubmit}>
  {/* Campo para el título */}
  <Form.Group className="mb-3" controlId="title">
    <Form.Label>Título</Form.Label>
    <Form.Control
      type="text"
      value={task.title}
      onChange={handleChange}
      name="title"
      placeholder="Escribe el título de la tarea"
    />
  </Form.Group>

  {/* Campo para la descripción */}
  <Form.Group className="mb-3" controlId="description">
    <Form.Label>Descripción</Form.Label>
    <Form.Control
      as="textarea"
      rows={3}
      value={task.description}
      onChange={handleChange}
      name="description"
      placeholder="Escribe la descripción de la tarea"
    />
  </Form.Group>

  {/* Campo para la fecha límite */}
  <Form.Group className="mb-3" controlId="dueDate">
    <Form.Label>Fecha límite</Form.Label>
    <Form.Control
      type="date"
      value={task.dueDate.toISOString().split("T")[0]}
      onChange={handleDateChange}
      name="dueDate"
    />
  </Form.Group>

  {/* Campo para la prioridad */}
  <Form.Group className="mb-3" controlId="priority">
    <Form.Label>Prioridad</Form.Label>
    <Form.Select
      value={task.priority}
      onChange={handleChange}
      name="priority"
    >
      <option value="high">Alta</option>
      <option value="medium">Media</option>
      <option value="low">Baja</option>
    </Form.Select>
  </Form.Group>

  {/* Campo para la categoría */}
  <Form.Group className="mb-3" controlId="category">
    <Form.Label>Categoría</Form.Label>
    <Form.Select
      value={task.category}
      onChange={handleChange}
      name="category"
    >
      <option value="work">Trabajo</option>
      <option value="personal">Personal</option>
      <option value="study">Estudio</option>
    </Form.Select>
  </Form.Group>

  {/* Botón para enviar */}
  <Button variant="primary" type="submit">
    Añadir
  </Button>
</Form>

      
    </>
)

}
export default AddTask;