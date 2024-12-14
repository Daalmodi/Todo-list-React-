interface FilterState {

    status: 'all' | 'completed' | 'pending' | undefined;
    
    priority: string | undefined;
    
    category: string | undefined;
    
    searchTerm: string;

    dueDateOrder:string;
    
    }
export  default FilterState;