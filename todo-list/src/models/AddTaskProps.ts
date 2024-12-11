import TaskModel from "./TaskModel";

interface AddTaskProps {
    onCreateTask: (task: TaskModel) => void;
}
export default AddTaskProps;