
import TaskModel from "./TaskModel";

interface FilterProps {

    onFilterChange?:(task:TaskModel[])=>void;
}
export default FilterProps;