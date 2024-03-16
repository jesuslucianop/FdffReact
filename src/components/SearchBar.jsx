import React, { useState } from 'react';

const SearchBar = ({onSearch})=>{
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = event => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value);
      };
    
    return (
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control "
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleChange}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button">Buscar</button>
          </div>
        </div>
      );
};
export default SearchBar;
