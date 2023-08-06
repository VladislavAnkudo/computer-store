import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";



axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

const AcceptContact = ({ show, onHide }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}api/contact`);
          setMessages(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchMessages();
    }, []);
  
    const handleDeleteMessage = async (id) => {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}api/contact`, { data: { id } });
        setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id));
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Просмотр обратной связи
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        {messages.map((message) => (
            <div key={message.id}>
              <p>Имя: {message.firstName}</p>
              <p>Фамилия: {message.lastName}</p>
              <p>Почта: {message.email}</p>
              <p>Телефон: {message.phone}</p>
              <p>Сообщение: {message.message}</p>
              <Button  variant="outline-danger" onClick={() => handleDeleteMessage(message.id)}>Удалить</Button>
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

export default AcceptContact;
