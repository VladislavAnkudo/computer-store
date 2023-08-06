import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";



axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

const AcceptReview = ({ show, onHide }) => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchNewReviews = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/checkfalse`);
        setReviews(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNewReviews();
  }, []);

  const handleApproveReview = async (id) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}api/approve`, { id });
      // Обновляем список отзывов после принятия
      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== id));
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteReview = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}api/delete`, { data: { id }});
      // Обновляем список отзывов после принятия
      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить отзыв
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        {reviews.map((review) => (
        <div key={review.id}>
          <p>Name:{review.name}</p>
          <p>Email: {review.email}</p>
          <p>Message: {review.message}</p>
          <Button className='me-4' variant="outline-success" onClick={() => handleApproveReview(review.id)}>Принять</Button>
          <Button className=''  variant="outline-danger" onClick={() => handleDeleteReview(review.id)}>Удалить</Button>
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

export default AcceptReview;
