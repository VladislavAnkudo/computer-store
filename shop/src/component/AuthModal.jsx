import React, {useContext, useState} from 'react';
import { NavLink , useNavigate} from 'react-router-dom'
import {login, registration} from "../http/userApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

export const  AuthLinks = observer (({ onClose }) => {
  const {user} = useContext(Context)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate()
  const handleToggle = () => {
       setShowLogin(!showLogin); 
  }; 
  const click = async () => {
    try {
        let data;
        if (showLogin) {
            data = await login(email, password);
            alert('Вы успешно вошли')
        } else {
            data = await registration(email, password);
            alert('вы успешно зарегистрировались')
        }
        user.setUser(user)
        user.setIsAuth(true)
       
    } catch (e) {
        alert(e.response.data.message)
    }

}

  const handleSubmit = (event) => {
    event.preventDefault();
    // Обработка отправки формы
  };

 /*  const handleClose = () => {
    onClose();
  }; */

  return (
    <div className ='wrapper'>
      <div className="wrapper__auth">
        <div className="auth-modal">
          <h2>{showLogin ? 'Авторизация' : 'Регистрация'}</h2>
          <form onSubmit={handleSubmit}>
            
            {showLogin && (
              <div className="popup__form">
                <label htmlFor="login-email">Email:</label>
                <input 
                  type="email" 
                  id="login-email" 
                   
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />

                <label htmlFor="login-password">Пароль:</label>
                <input type="password" id="login-password"  
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            )}

          
            {!showLogin && (
              <div className="popup__form">
                <label htmlFor="register-email">Email:</label>
                <input type="email" id="register-email"  
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />

                <label htmlFor="register-password">Пароль:</label>
                <input type="password" id="register-password"  
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />

                <label htmlFor="register-confirm-password">Подтвердите пароль:</label>
                <input type="password" id="register-confirm-password"  />
              </div>
            )}
            
            <button onClick={click} type="submit">{showLogin ? 'Войти' : 'Зарегистрироваться'}</button>
          </form>

        
          <div>
            <button onClick={handleToggle}>{/* to={'/auth' +'/registration'} to={'/auth' + '/login'} */}
            {
              showLogin ? 
              <div onClick={() => navigate('/auth' + '/registration')}>Создать аккаунт</div>
              : 
              <div onClick={() => navigate('/auth' + '/login')}>Войдите!</div>
            }
              </button>
          {/*  <button onClick={handleClose}>Закрыть</button> */}
          </div>
        </div>
         <div>
         </div>
      </div>
    </div>
  );
})
