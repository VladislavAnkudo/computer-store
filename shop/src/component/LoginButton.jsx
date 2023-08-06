/* import React, { useState } from 'react';
import {AuthModal} from './AuthModal';

 function LoginButton() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  }
  return (
    <>
      <button className='auth__button' onClick={handleShowModal}>Авторизоваться</button>
      {showModal && <AuthModal onClose={handleCloseModal}/>}
    </>
  );
}

export  {LoginButton}; */