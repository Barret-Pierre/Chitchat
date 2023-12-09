import React, { useState } from 'react';
import './Search.css'

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    // Vous pouvez effectuer d'autres actions ici, comme lancer une requête vers un serveur
    // pour obtenir des résultats de recherche dynamiques en fonction de searchTerm
  };

  return (
    <div className='search'>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Rechercher..."
      />
      <div>Résultats de la recherche : {searchTerm}</div>
      {/* Vous pouvez remplacer {searchTerm} par les résultats réels de votre recherche */}
    </div>
  );
}

export default Search;