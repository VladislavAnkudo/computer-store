import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";



axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

const AcceptOrder = ({ show, onHide }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}api/basket/order`);
          setOrders(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchMessages();
    }, []);
  
    const handleDeleteMessage = async (id) => {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}api/basket/order/delete`, { data: { id } });
        setOrders((prevMessages) => prevMessages.filter((message) => message.id !== id));
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Просмотр оформленных заказов
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        {orders.map((order) => (
            <div key={order.id}>
              <p>Страна: {order.country}</p>
              <p>Имя: {order.firstName}</p>
              <p>Фамилия: {order.lastName}</p>
              <p>Адрес: {order.address}</p>
              <p>Дом, квартира: {order.house}</p>
              <p>Город: {order.city}</p>
              <p>Почта: {order.email}</p>
              <p>Телефон: {order.phone}</p>
              <p>Оплата: {order.typepay}</p>
              <p>Корзина: {order.basketDeviceId}</p>
              <Button className=''  variant="outline-danger" onClick={() => handleDeleteMessage(order.id)}>Удалить</Button>
            </div>
        ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AcceptOrder;
