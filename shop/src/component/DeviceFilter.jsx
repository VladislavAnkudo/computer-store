import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const DeviceFilter = ({ onFilterChange, onResetFilter }) => {
  const [priceRange, setPriceRange] = useState([1000, 3000]);

  const handleFilterByPrice = () => {
    onFilterChange(priceRange);
  };

  const handleResetFilter = () => {
    setPriceRange([1000, 3000]);
    onResetFilter();
  };

  return (
    <div>
      <div className='input__range-shop__page'>
        <Form.Range
          type='range'
          id='priceRange'
          min='1000'
          max='1500'
          step='10'
          value={priceRange[0]}
          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
          className='form-range'
        />
        <Form.Range
          type='range'
          value={priceRange[1]}
          min='1500'
          max='3000'
          step='10'
          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          className='form'
        />
      </div>
      <div>
        <label htmlFor='priceRange'>Цена:</label>
        <input
          type='text'
          value={`${priceRange[0]} - ${priceRange[1]}`}
          onChange={(e) => {
            const [min, max] = e.target.value.split('-').map((val) => Number(val.trim()));
            setPriceRange([min, max]);
          }}
        />
      </div>
      <Button variant='outline-primary' className='mt-4 mb-4 width' onClick={handleFilterByPrice}>
        Применить фильтр
      </Button>
      <Button variant='outline-danger' className='mr-4' onClick={handleResetFilter}>
        Сбросить фильтр
      </Button>
    </div>
  );
};

export default DeviceFilter;
