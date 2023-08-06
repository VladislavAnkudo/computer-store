import React, { useState, useEffect } from 'react';
import Image from "react-bootstrap/Image";
import empty from "../assets/images/empty.png";
import {useNavigate} from "react-router-dom"
export const Wishlist = () =>{
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    setFavorites(savedFavorites);
  }, []);

  const handleRemoveFromFavorites = (favoriteId) => {
    const updatedFavorites = favorites.filter((favorite) => favorite.id !== favoriteId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <div className="wrapper">
      <div className='basket__page-title'>Избранные товары</div>
      {favorites.length === 0 ? (
        <div className='wishilist__list'>
          <div className='wishlist__title'>Список избранных товаров пуст</div> 
          <div>Добавьте несколько товаров.</div> 
          <img src={empty} alt="empty" />
          <button className='basket__page-total__button' onClick={() => navigate('/shop')}>Вернуться в каталог</button>
        </div>
      ) : (
        <div className='wishlist__item'>
          {favorites.map((favorite) => (
            <div key={favorite.id} className='wishlist__background'>
              <div className='wishlist__img-title'>
                <Image width={180} height={150} src={process.env.REACT_APP_API_URL + favorite.img}/>
                <div className='divice__name'>{favorite.name}</div>
              </div>
              <div className='price-and-delete'>
                <div>{favorite.price}$</div>
                <div style={{cursor: 'pointer'}} onClick={() => handleRemoveFromFavorites(favorite.id)}>X</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
