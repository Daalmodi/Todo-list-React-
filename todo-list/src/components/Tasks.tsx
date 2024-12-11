import Task from "./Task"
import TaskProps from "../models/TaskProps"

const Tasks: React.FC<TaskProps>=({task})=>{
return(
    <>
    <h1> ToDO List</h1>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Estado</th>
                    <th>Titulo</th>
                    <th>Descripción</th>
                    <th>Fecha Limite</th>
                    <th>Prioridad</th>
                    <th>Categoria</th>
                    <th>Creado en</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                 <Task task={task}/>
            </tbody>
            
        </table>
    </>

)
}
export default Tasks