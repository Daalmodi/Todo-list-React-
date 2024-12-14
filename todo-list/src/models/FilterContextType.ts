import FilterState from "./FilterState";

interface FilterContextType {
    globalFilter?:FilterState;
    setglobalFilter?: (filter: FilterState) => void;
  }
  export default FilterContextType;