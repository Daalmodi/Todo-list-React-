import { createContext } from "react";
import FilterContextType from "../models/FilterContextType";

const FilterContext =createContext<FilterContextType | undefined>(undefined);


export default FilterContext;
