import axios from "axios";

const deleteTask = async(id:string)=>{
try {
    const result = await axios.delete(`http://localhost:3000/tasks/${id}`);
    if(result.status === 200){
        return true;
    }
} catch (error) {
    console.log(error);
    
    return false;
}
}
export default deleteTask;