import React, { useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "../CSS/contact.css";

function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}api/contact`, {
        firstName,
        lastName,
        email,
        phone,
        message,
      });

      console.log(response.data);

      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <div className="contact">
      <div className="contact__shell">
        <div className="wrapper">
          <div className="contact__data">
            <div>
              <div className="contact__title">Контактная информация</div>
              <div className="contact__subtitle">
                Заполните форму, и наша команда свяжется с вами в течение 24 часов.
              </div>
              <ul className="contact__list">
                <li className="contact__item">
                  <a href="tel:+375291234567" className="contact__links contact-phone__links">
                    +375(29)-123-45-67
                  </a>
                </li>
                <li className="contact__item">
                  <a href="mailto:InfoTech@gmail.com" className="contact__links contact-email__links">
                    InfoTech@gmail.com
                  </a>
                </li>
                <li className="contact__item">
                  <a
                    href="https://goo.gl/maps/mf2XANPeSZLF4bH5A"
                    className="contact__links contact-adress_links"
                  >
                    18 South Park, London
                  </a>
                </li>
              </ul>
              <div className="contact__social-full">
                <ul className="contact__social-list">
                  <a href="https://twitter.com/" className="conact__social-links">
                    <li className="footer__item"></li>
                  </a>
                  <a href="https://www.facebook.com/" className="conact__social-links">
                    <li className="footer__item"></li>
                  </a>
                  <a href="https://www.instagram.com/" className="conact__social-links">
                    <li className="footer__item"></li>
                  </a>
                  <a href="https://www.linkedin.com/" className="conact__social-links">
                    <li className="footer__item"></li>
                  </a>
                </ul>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="contact__form">
              <div className="contact__form-info">
                <div className="contact__form-field">
                  <div className="contact__form-title">Имя</div>
                  <input
                    type="text"
                    className="contact__form-input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="contact__form-field">
                  <div className="contact__form-title">Фамилия</div>
                  <input
                    type="text"
                    className="contact__form-input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="contact__form-info">
                <div className="contact__form-fields">
                  <div className="contact__form-title_two">Почта</div>
                  <input
                    type="email"
                    className="contact__form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="contact__form-fields">
                  <div className="contact__form-title_two">Телефон</div>
                  <input
                    type="number"
                    className="contact__form-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="contact__form-fields">
                <div className="contact__form-title-last">Сообщение</div>
                <div className="contact__form-title_two">Напишите ваше сообщение...</div>
                <input
                  type="text"
                  className="contact__form-input-last"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <Button type="submit" className="contact__form-button">
                Отправить
              </Button>

              <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Сообщение отправлено</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>Спасибо за ваше сообщение. Мы свяжемся с вами в ближайшее время.</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Закрыть
                  </Button>
                </Modal.Footer>
              </Modal>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Contact };
