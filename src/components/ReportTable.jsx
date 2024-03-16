import React, {useState, useEffect} from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPaginate from 'react-paginate'; // Asegúrate de importar ReactPaginate
import SearchBar from "./SearchBar";

const ReportTable = () => {
    const [reportData, setReportData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 10; // Número de elementos por página


    useEffect(() => {
      // Lógica para obtener datos del reporte desde la API
      axios.get('http://ifbbdominicana.org:4000/report')
        .then(response => {
          console.log(response);
          setReportData(response.data.data);
        })
        .catch(error => {
          console.error('Error al obtener datos del reporte:', error);
        });
    }, []);

    const pageCount = Math.ceil(reportData.length / itemsPerPage);

    const handlePageChange = ({ selected }) => {
      setPageNumber(selected);
    };

    const handleSearch = searchTerm => {
        setSearchTerm(searchTerm);
    }; 

    
    const filteredData = reportData ? reportData.filter(item =>
        (item.Nombres && item.Nombres.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.Apellidos && item.Apellidos.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.CategoriaCompite && item.CategoriaCompite.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.Cedula && item.Cedula.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.FechaInscripcion && item.FechaInscripcion.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.Nacionalidad && item.Nacionalidad.toLowerCase().includes(searchTerm.toLowerCase()))
    ) : [];

    const displayData = filteredData.slice(
      pageNumber * itemsPerPage,
      (pageNumber + 1) * itemsPerPage
    );
  
    return (
      <>
      <div className="container">
      <div className="row">
        <div className="titulo"> 
        <h2>Listado de Atletas Inscritos.</h2 >
        </div>
     
        <SearchBar onSearch={handleSearch} /> {/* Integrar el componente de búsqueda */}

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Categoria Compite</th>
              <th>Cedula</th>
              <th>Fecha Inscripcion</th>
              <th>Nacionalidad</th>
       
              {/* Agrega más encabezados de columna según tus datos */}
            </tr>
          </thead>
          <tbody>
            
          {displayData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.Nombres}</td>
                <td>{item.Apellidos}</td>
                <td>{item.CategoriaCompite}</td>
                <td>{item.Cedula}</td>
                <td>{item.FechaInscripcion}</td>
                <td>{item.Nacionalidad}</td>
           
 
                {/* Renderiza más datos según tus necesidades */}
              </tr>
            ))}
          </tbody>
        </Table>
        <ReactPaginate
          previousLabel={"Anterior"}
          nextLabel={"Siguiente"}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
      </div>
      </>
    );
  };
  
  export default ReportTable;