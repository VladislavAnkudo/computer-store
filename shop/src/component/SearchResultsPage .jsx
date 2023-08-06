import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Card, Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchResultsPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('query');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Отправляем GET-запрос на серверную часть для поиска товаров
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/search?query=${searchQuery}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [searchQuery]);

  return (
    <div className='wrapper'>
      <p className='search__page-query'>Поиск: {searchQuery}</p>
      <p>Найдено похожих товаров: {searchResults.length}</p>
      {searchResults.length > 0 ? (
        <div className='search__page-devices'>
          {searchResults.map((device) => (
            <div key={device.id}>
              <Card border={'#D1D1D1'}>
                <Col
                  className="img-and-name"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate('/shop' + '/' + device.id)}
                >
                  <Image width={180} height={150} src={process.env.REACT_APP_API_URL + device.img} />
                  <div className="divice__name">{device.name}</div>
                </Col>
                <div className="price-and-wish">
                  <div>{device.price}$</div>
                </div>
              </Card>
            </div>
            ))}
        </div>
      ) : (
        <p>По вашему запросу ничего не найдено.</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
