import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if (!searchQuery) {
      alert('Пожалуйста, введите поисковый запрос');
      return;
    }
    navigate(`/search?query=${searchQuery}`)
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
        placeholder="Введите требуемый товар"
      />
      <button className="btn-header" type="submit">Найти</button>
    </form>
  );
};

export  default SearchInput;
