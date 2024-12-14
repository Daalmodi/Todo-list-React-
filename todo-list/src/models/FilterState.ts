interface FilterState {

    status: 'all' | 'completed' | 'pending';
    
    priority: string | undefined;
    
    category: string | undefined;
    
    searchTerm: string;

    dueDateOrder:string;
    
    }
export  default FilterState;