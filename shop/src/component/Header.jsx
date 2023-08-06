import logo from "../assets/icons/logo.png";
import React, {useContext} from "react";
import {Link, NavLink} from "react-router-dom"
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import SearchInput from './SearchInput'
export const  Header = observer(() => {

  
  const email = localStorage.getItem('email')
  

  const {user} = useContext(Context)
  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
  }

  return (
    <header className="header">
      <div className="wrapper">
        <div className="header__wrapper">
          <div className="header__logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className="header__search-input">
            <SearchInput/>
          </div>
          <div className="header__contact">
            <a href="tel:+375291234567" className="header__links-contact">
              Телефон: +375(29)-123-45-67
            </a>
            <a
              href="mailto:InfoTech@gmail.com"
              className="header__links-contact"
            >
              Почта: InfoTech@gmail.com
            </a>
          </div>
        </div>
        <nav className="header__nav">
          <ul className="header__list">
            <li className="header__item">
              <NavLink to="/" className="header__links-nav">
                Главная
              </NavLink>
            </li>
            <li className="header__item">
              <NavLink to="/shop" className="header__links-nav">
                Товары
              </NavLink>
            </li>
            <li className="header__item">
              <NavLink to="/news" className="header__links-nav">
                Новости
              </NavLink>
            </li>
            <li className="header__item">
              <NavLink to="/about" className="header__links-nav">
                О нас
              </NavLink>
            </li>
            <li className="header__item">
              <NavLink to="/contact" className="header__links-nav">
                Написать нам
              </NavLink>
            </li>
            <li className="header__item">
              <NavLink to="/faq" className="header__links-nav">
                Вопросы и ответы
              </NavLink>
            </li>
          </ul>
          {
            (email === 'admin@admin.ru') ?
              <NavLink to="/admin" className="header__links-nav" >
                админ
              </NavLink> : ''
          }
         
          <ul className="header__list-second">
            <li className="header__item">
                <NavLink to="/auth" className="header__links-nav" onClick={() => {
                    logOut()
                    localStorage.removeItem('email');
                }}>
                  {email ? email : 'Зарегистрироваться'}
                </NavLink>
            </li>
            <li className="header__item">
              <NavLink to="/wishlist" className="header__links-nav">
                Избранное
              </NavLink>
            </li>
            <li className="header__item">
              <NavLink to="/basket" className="header__links-nav">
                Корзина
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
})
