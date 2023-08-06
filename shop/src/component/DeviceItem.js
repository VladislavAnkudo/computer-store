import React, { useState } from 'react';
import { Card, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import wishlist from '../assets/icons/wishlist.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeviceItem = ({ device }) => {
  const navigate = useNavigate();
  const [basketItems, setBasketItems] = useState([]);

  const handleAddToBasket = (device) => {
    if (!localStorage.getItem('token')) {
      // Проверка на авторизацию пользователя
      alert('Вы должны быть авторизованы, чтобы добавить товар в корзину');
      return;
    }

    if (device.quantity === 0) {
      alert('Товар недоступен для добавления в корзину');
      return;
    }

    if (device.quantity <= basketItems.length) {
      alert('Достигнуто максимальное количество товаров');
      return;
    }

    const itemIndex = basketItems.findIndex((item) => item.device.id === device.id);

    if (itemIndex === -1) {
      setBasketItems([...basketItems, { device, count: 1 }]);
      alert('Товар успешно добавлен в корзину!');
    } else {
      const updatedBasketItems = [...basketItems];
      updatedBasketItems[itemIndex].count += 1;
      setBasketItems(updatedBasketItems);
      alert('Количество товара в корзине обновлено!');
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}api/basket`, { id: device.id, count: 1 }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  const handleAddToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isAlreadyInFavorites = favorites.some((favorite) => favorite.id === device.id);
    if (isAlreadyInFavorites) {
      alert('Этот товар уже добавлен в избранное!');
    } else {
      const updatedFavorites = [...favorites, device];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      alert('Товар добавлен в избранное!');
    }
  };

  return (
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
        <Image
          style={{ cursor: 'pointer' }}
          width={18}
          height={18}
          src={wishlist}
          onClick={handleAddToFavorites}
        />
      </div>
      <button className="button__device" onClick={() => handleAddToBasket(device)}>
        В корзину
      </button>
    </Card>
  );
};

export default DeviceItem;
