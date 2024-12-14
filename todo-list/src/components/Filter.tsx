import FilterProps from "../models/FilterProps";
import { Col, Form, Row } from "react-bootstrap";
import FilterState from "../models/FilterState";
import { useContext, useEffect, useState } from "react";
import FilterContext from "../context/FilterContext";



const Filter: React.FC<FilterProps>=()=>{
  const {setglobalFilter}= useContext(FilterContext)||{};
  const [filters, setFilters] = useState<FilterState>({
    status: undefined,
    priority: undefined,
    category: undefined,
    searchTerm: "",
    dueDateOrder:""
  });

  useEffect(()=>{
    const storedFilter = localStorage.getItem("FILTRO");
    if (storedFilter) {
      const filter: FilterState = JSON.parse(storedFilter);
      setFilters(filter);
    } 
  } 
  ,[]);



  const handleFilterChange=(field:keyof FilterState,value:string | null)=>{
    
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);
    
    setglobalFilter?.(updatedFilters);
    
  }


    return (
        <Form>
        <Row className="align-items-center">
          {/* Filtro por estado */}
          <Col xs={12} md={3}>
            <Form.Group controlId="filterStatus">
              <Form.Label>Status</Form.Label>
              <Form.Select 
                value={filters.status}
                onChange={(event)=>handleFilterChange("status",event.target.value)}
              >
                
                <option value="all">Todo</option>
                <option value="completed">Completado</option>
                <option value="pending">Pendiente</option>
              </Form.Select>
            </Form.Group>
          </Col>
  
          {/* Filtro por prioridad */}
          <Col xs={12} md={3}>
            <Form.Group controlId="filterPriority">
              <Form.Label>Prioridad</Form.Label>
              <Form.Select
              value={filters.priority?? ''}
              onChange={(event)=>handleFilterChange("priority",event.target.value)}

              >
                
                <option value="all">Todas las Prioridades</option>
                <option value="high">Alta</option>
                <option value="medium">Media</option>
                <option value="low">Baja</option>
              </Form.Select>
            </Form.Group>
          </Col>
  
          {/* Filtro por categoría */}
          <Col xs={12} md={3}>
            <Form.Group controlId="filterCategory">
              <Form.Label>Categorias</Form.Label>
              <Form.Select
                value={filters.category??''}
                onChange={(event)=>handleFilterChange("category",event.target.value)}
              >
                <option value="all">Todas las Categorias</option>
                <option value="work">Trabajo</option>
                <option value="personal">Personal</option>
                <option value="study">Estudio</option>
              </Form.Select>
            </Form.Group>
          </Col>


          {/* Ordenar por Fecha limite */}
          <Col xs={12} md={3}>
            <Form.Group controlId="filterDueDate">
              <Form.Label> Ordenar Fecha limite</Form.Label>
              <Form.Select
                value={filters.dueDateOrder??''}
                onChange={(event)=>handleFilterChange("dueDateOrder",event.target.value)}
              >
                <option value="default">Por Defecto</option>
                <option value="upward">Ascendente</option>
                <option value="falling">Descendente</option>
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Búsqueda por término */}
          <Col xs={12} md={3}>
            <Form.Group controlId="filterSearch">
              <Form.Label>Busqueda</Form.Label>
              <Form.Control
                type="text"
                placeholder="Buscar..."
                value={filters.searchTerm}
                onChange={(event)=>handleFilterChange("searchTerm",event.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      
    );
         

    
};
export default Filter;