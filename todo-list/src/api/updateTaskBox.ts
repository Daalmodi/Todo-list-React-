import axios from "axios";

const updateTaskBox = async(id:string,box:boolean)=>{
    try {
        const newbox={
            completed:box
        };
        const result = await axios.patch(`http://localhost:3000/tasks/${id}`,newbox);
        if(result.status === 200){
            return result.data;
        }
    } catch (error) {
        console.log("No hubo conexion al backend "+error);
        return null;
    }
}
export default updateTaskBox;