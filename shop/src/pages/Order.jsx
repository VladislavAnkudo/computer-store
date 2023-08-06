import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

const Order = ({ basketId }) => {
  const [country, setCountry] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [house, setHouse] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const navigate = useNavigate();

  const [typepay, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!country || !firstName || !lastName || !address || !house || !city || !phone || !email) {
      setIsErrorModalOpen(true);
      return;
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}api/basket/order`, {
        basketId,
        country,
        firstName,
        lastName,
        address,
        house,
        city,
        email,
        phone,
        typepay,
      })
      .then((response) => {
        const { orderId } = response.data;
        setOrderNumber(orderId);
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  return (
    <div className="wrapper">
      <div className="order__goback">
        <div className="order__page-title">Заказ</div>
        <div className="order__page-goback" onClick={() => navigate(-1)}>
          &lt; вернуться назад
        </div>
      </div>
      <form className="order__form-sumbit" onSubmit={handleSubmit} style={{'margin': '0 auto'}}>
        <div className="wrapper__form-order">
          <div>
            <input
              className="order__input-country"
              type="text"
              placeholder="Страна"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
            />
          </div>
          <div className="order__input-names">
            <input
              className="order__input-firstname"
              type="text"
              placeholder="Имя"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
            <input
              className="order__input-firstname"
              type="text"
              placeholder="Фамилия"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
          <div>
            <input
              className="order__input-country"
              type="text"
              id="address"
              value={address}
              placeholder="Адрес"
              onChange={(event) => setAddress(event.target.value)}
            />
          </div>
          <div className="order__input-names">
            <input
              className="order__input-firstname"
              type="text"
              placeholder="Дом, квартира"
              value={house}
              onChange={(event) => setHouse(event.target.value)}
            />
            <input
              className="order__input-firstname"
              type="text"
              placeholder="Город"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
          </div>
          <div className="order__input-names">
            <input
              className="order__input-firstname"
              type="number"
              placeholder="Телефон"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
            <input
              className="order__input-firstname"
              type="email"
              placeholder="Электронная почта"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <div>Оплата при получении:</div>
            <label>
              Наличными:
              <input
                type="radio"
                name="option"
                value="наличными"
                checked={typepay === 'наличными'}
                onChange={handleOptionChange}
              />
            </label>
            <label style={{'margin-left': '25px', 'margin-top': '10px'}}>
              Картой:
              <input
                type="radio"
                name="option"
                value="картой"
                checked={typepay === 'картой'}
                onChange={handleOptionChange}
              />
            </label>
          </div>
          <input type="hidden" name="basketId" value={basketId} />
        </div>
        <button type="submit" className="basket__page-total__button" style={{'margin-bottom': '100px'}}>
          Заказать
        </button>
      </form>
      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Заказ оформлен</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Номер заказа: {orderNumber}</p>
          <p>Почта: {email}</p>
          <p>Телефон: {phone}</p>
          <p>Оплата при получении: {typepay}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeModal}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={isErrorModalOpen} onHide={closeErrorModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ошибка</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Пожалуйста, заполните все поля.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeErrorModal}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export { Order };
