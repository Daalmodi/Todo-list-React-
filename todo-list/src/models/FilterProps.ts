
import TaskModel from "./TaskModel";

interface FilterProps {

    onFilterChange?:(task:TaskModel[])=>void;
    categories?: string[];
    priorities?: string[];
  }
export default FilterProps;