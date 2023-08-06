import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Image } from "react-bootstrap";

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

function Basket() {
  const [basketItems, setBasketItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const deleteItem = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}api/basket/${id}`)
      .then((response) => {
        const newBasketItems = [...basketItems];
        const itemIndex = newBasketItems.findIndex((item) => item.id === id);
        if (itemIndex !== -1) {
          newBasketItems.splice(itemIndex, 1);
          setBasketItems(newBasketItems);
          const newTotalPrice = newBasketItems.reduce(
            (total, item) => total + item.count * item.device.price,
            0
          );
          setTotalPrice(newTotalPrice);
          const newTotalItemsCount = newBasketItems.reduce(
            (total, item) => total + item.count,
            0
          );
          setTotalItemsCount(newTotalItemsCount);
        }
      })
      .catch((error) => console.log(error));
  };

  const applyPromoCode = () => {
    if (promoCode === 'CURSED') {
      setDiscount(0.15); // Применение скидки на 15%
    } else {
      setDiscount(0); // Сброс скидки
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/basket`)
      .then((response) => {
        setBasketItems(response.data);
        const newTotalPrice = response.data.reduce(
          (total, item) => total + item.count * item.device.price,
          0
        );
        setTotalPrice(newTotalPrice);
        const newTotalItemsCount = response.data.reduce(
          (total, item) => total + item.count,
          0
        );
        setTotalItemsCount(newTotalItemsCount);
      })
      .catch((error) => console.log(error));
  }, []);

  const totalPriceWithDiscount = totalPrice - totalPrice * discount;

  const handleCheckout = () => {
    if (basketItems.length === 0) {
      openModal();
    } else {
      navigate('/basket/order');
    }
  };

  return (
    <div className="wrapper">
      <div className="order__goback">
        <div className="order__page-title">Корзина</div>
        <div className="order__page-goback" onClick={() => navigate('/shop')}>
          &lt; вернуться в каталог
        </div>
      </div>
      <div className="basket__page-full_info-price">
        <div>
          {basketItems.map((item) => (
            <div key={item.id} className="basket__page-item">
              <div className="basket__page-img-info">
                <Image
                  className="basket__page-img"
                  width={130}
                  height={110}
                  src={process.env.REACT_APP_API_URL + item.device.img}
                />
                <div className="basket__page-info">
                  <span>{item.device.name}</span>
                  <span>
                    {item.device.price}$ x {item.count}
                  </span>
                  <span>-</span>
                  <span>{item.device.price * item.count}$</span>
                  <div
                    data-tooltip="удалить"
                    onClick={() => deleteItem(item.id)}
                    className="basket__page-delete__button"
                  >
                    X
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="basket__page-total__count-price">
            <div className="basket__page-total__title">Ваш заказ</div>
            <span>Общее количество:</span>
            <span className="basket__page-numbers__count">{totalItemsCount}</span>
            <div className="basket__page-total__title">Итого:</div>
            <span>Сумма заказа:</span>
            <span className="basket__page-numbers__count">{totalPrice}$</span>
            <div className="basket__page-promo__code">
              <input
                type="text"
                placeholder="Промокод"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="basket__page-input-seil"
              />
              <span className="basket__page-accept__seil" onClick={applyPromoCode}>
                применить
              </span>
            </div>
            <div className="basket__page_total-seil">
              <div>
                Сумма заказа с учетом скидки:
                <span className="basket__page-numbers__count">{totalPriceWithDiscount}$</span>
              </div>
              <div>
                Примененная скидка:
                <span className="basket__page-numbers__count">{discount * 100}%</span>
              </div>
            </div>
            <button onClick={handleCheckout} className="basket__page-total__button">
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ошибка</Modal.Title>
        </Modal.Header>
        <Modal.Body>Для оформления заказа сначала нужно добавить товар в корзину.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export { Basket };
