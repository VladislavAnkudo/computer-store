import React, { useState } from 'react';
import axios from 'axios';

const EmailForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${process.env.REACT_APP_API_URL}api/faq/sendemail`, { email })
      .then((response) => {
        console.log(response.data);
        // Здесь вы можете показать пользователю уведомление о успешной отправке
      })
      .catch((error) => {
        console.log(error);
        // Здесь вы можете показать пользователю уведомление об ошибке
      });

    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Введите вашу почту"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="information__input"
        required
      />
      <button type="submit" className="information__btn">Отправить</button>
    </form>
  );
};

export  {EmailForm};
