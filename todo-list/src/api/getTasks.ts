import axios from "axios";

const getTasks = async()=>{
try {
    const result = await axios.get("http://localhost:3000/tasks");
    if(result.status ===200){
        return result.data;
    }

} catch (error) {
    console.error("No hubo conexion al backend "+error)
    return null
}
}
export default getTasks;