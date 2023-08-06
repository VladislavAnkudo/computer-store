import logo from "../assets/icons/logo.png";
import React, {useState} from "react";
import {Link} from "react-router-dom"
import {EmailForm} from '../component/SendMail'

export function Footer() {

 /*  const Sumbitkey = (event) => {
    if (event.key === "Enter") {
        setSumbitBtn(sumbitBtn);
    }
  }; */

  

  return (
    <footer className="footer">
      <div className="wrapper">
        <div className="footer__wrapper">
          <div className="footer__information">
            <h2 className="information__title">
              Хочешь быть в курсе акций и новинок
            </h2>
            <div className="information__input-btn">
              <EmailForm/>
            </div>
          </div>
          <div className="footer__full-information">
            <div className="footer__description">
              <img src={logo} alt="logo" />
              <div className="inforamiton__description">
                Если вы ищете высококачественные компьютеры и комплектующие по
                лучшим ценам, то наш интернет-магазин является вашим идеальным
                выбором.
              </div>
              <div className="footer__social-links">
                <div className="social__name">Социальные сети:</div>
                <ul className="footer__list">
                  <a href="https://twitter.com/" className="footer__links">
                    <li className="footer__item"></li>
                  </a>
                  <a href="https://www.facebook.com/" className="footer__links">
                    <li className="footer__item"></li>
                  </a>
                  <a href="https://www.instagram.com/" className="footer__links">
                    <li className="footer__item"></li>
                  </a>
                  <a href="https://www.linkedin.com/" className="footer__links">
                    <li className="footer__item"></li>
                  </a>
                </ul>
              </div>
            </div>
            <div className="footer__navigation">
              <div className="navigation__title">Навигация</div>
              <ul className="navigation__list">
                <li className="navigation__item">
                  <Link to="/" className="navigation__links">
                    Главная
                  </Link>
                </li>
                <li className="navigation__item">
                  <Link to="/shop" className="navigation__links">
                    Товары
                  </Link>
                </li>
                <li className="navigation__item">
                  <Link to="/news" className="navigation__links">
                    Новости
                  </Link>
                </li>
                <li className="navigation__item">
                  <Link to="/about" className="navigation__links">
                    О нас
                  </Link>
                </li>
                <li className="navigation__item">
                  <Link to="contact" className="navigation__links">
                    Написать нам
                  </Link>
                </li>
                <li className="navigation__item">
                  <Link to="/faq" className="navigation__links">
                    Вопросы и ответы
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer__contact">
              <div className="navigation__title">Связаться с нами</div>
              <ul className="navigation__list">
                <li className="navigation__item">
                  <a
                    href="mailto:InfoTech@gmail.com"
                    className="navigation__links email__links"
                  >
                    InfoTech@gmail.com
                  </a>
                </li>
                <li className="navigation__item">
                  <a
                    href="https://goo.gl/maps/mf2XANPeSZLF4bH5A"
                    className="navigation__links adress_links"
                  >
                    67 MacArthur Ave, Closter, NJ 07624, Соединенные Штаты
                  </a>
                </li>
                <li className="navigation__item">
                  <a
                    href="tel:+375291234567"
                    className="navigation__links phone__links"
                  >
                    +375(29)-123-45-67
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
