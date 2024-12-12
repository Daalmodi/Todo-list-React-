import Task from "./Task"
import TaskProps from "../models/TaskProps"



const Tasks: React.FC<TaskProps>=({task,oneDeleteTask,oneUpdateTask,onUpdatebox})=>{



return(
    <>
    <h1> ToDO List</h1>
        <table>
            <thead>
                <tr>
                    <th>Estado</th>
                    <th>Id</th>
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
                 <Task task={task} onDelete={oneDeleteTask} onUpdate={oneUpdateTask} onUpdatebox={onUpdatebox}/>
            </tbody>
            
        </table>
    </>

)
}
export default Tasks