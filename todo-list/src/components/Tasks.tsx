import Task from "./Task";
import TaskProps from "../models/TaskProps";



const Tasks: React.FC<TaskProps>=({task,oneDeleteTask,onUpdateTask,onUpdatebox})=>{
    

return(
    <>
    

    <div className="table-responsive  tableContainer" >
        <table className="tables">
            <thead >
                <tr className="tablehead">
                    <th>Estado</th>
                    
                    <th>Título</th>
                    <th>Descripción</th>
                    <th>Fecha Limite</th>
                    <th>Prioridad</th>
                    <th>Categoría</th>
                    <th>Creado en</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody className="tablebody">
                 <Task task={task} onDelete={oneDeleteTask} onUpdateTask={onUpdateTask} onUpdatebox={onUpdatebox}/>
            </tbody>
            
        </table>
    </div>
    </>

)
}
export default Tasks;