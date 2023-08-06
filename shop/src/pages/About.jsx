import pc__left from "../assets/images/pc__left.png";
import pc__rigth from "../assets/images/pc__rigth.png";
import pc__top_center from "../assets/images/pc__top-center.png";
import pc__bottom_center from "../assets/images/pc__bottom-center.png";

import one__boys from "../assets/images/one__boys.png";
import two__boys from "../assets/images/two__boys.png";
import three__boys from "../assets/images/three__boys.png";
import one__girl from "../assets/images/one__girl.png";

import "../CSS/about.css";

export const  About = () => {


 return(
    <div className="wrapper">
        <div className="about__title">
            Что такое <span className="about__title-blue">InfoTeach</span> и почему вам выгоднее работать с нами!
        </div>
        <div className="about__images">
            <img src={pc__left} alt="pc"/>
            <div className="about__images-two">
                <img src={pc__top_center} alt="pc" />
                <img src={pc__bottom_center} alt="pc"/>
            </div>
            <img src={pc__rigth} alt="pc" />
        </div>
        
        <div className="whychooseus__title">
            Почему выбирают нас
        </div>
        <div className="whychooseus__description">
            <ul className="whychooseus__list">
                <li className="whychooseus__item">
                    предлагаем широкий ассортимент компьютеров, компьютерной периферии
                </li>
                <li className="whychooseus__item">
                    предлагаем только качественную и сертифицированную технику и комплектующие
                </li>
                <li className="whychooseus__item">
                    предлагаем онлайн покупку комплектующих
                </li>
                <li className="whychooseus__item">
                    проводим регулярные акции и предлагают скидки на различные товары
                </li>
                <li className="whychooseus__item">
                    можно заказывать из любой точки мира 
                </li>
            </ul>
        </div>
        <div className="littletext__title">
            Небольшой текст  о нас
        </div>
        <div className="littletext__subtitle">
            Наш магазин компьютерной техники предлагает широкий ассортимент товаров
            для различных целей и задач. У нас вы можете найти компьютеры, мониторы 
            и другие устройства от ведущих производителей по доступным ценам. 
        </div>
        <div className="littletext__description">
            Мы гарантируем качество всех наших товаров и предоставляем профессиональную 
            помощь в выборе техники, а также послепродажное обслуживание. Будьте уверены, 
            что приобретая у нас технику, вы получаете надежный и высокопроизводительный 
            продукт, который прослужит долгое время.
        </div>
        <div className="littletext__title">
            Наша команда
        </div>
        <div className="our__works">
            <div className="our__one-works">
                <img src={one__boys} alt="boy" />
                <div className="our__one-works-titleandwork">
                    <div className="our__one-work__title">Директор</div>
                    <div className="our__one-work__work">Антон Петров</div>
                </div>
            </div>
            <div className="our__one-works">
                <img src={two__boys} alt="boy" />
                <div className="our__one-works-titleandwork">
                    <div className="our__one-work__title">Комплектовщик</div>
                    <div className="our__one-work__work">Алексей Васильев</div>
                </div>
            </div>
            <div className="our__one-works">
                <img src={three__boys} alt="boy" />
                <div className="our__one-works-titleandwork">
                    <div className="our__one-work__title">Комплектовщик</div>
                    <div className="our__one-work__work">Родион Иванов</div>
                </div>
            </div>
            <div className="our__one-works">
                <img src={one__girl} alt="boy" />
                <div className="our__one-works-titleandwork">
                    <div className="our__one-work__title">Менеджер</div>
                    <div className="our__one-work__work">Ангелина Анкудо</div>
                </div>
            </div>
        </div>
    </div>
    )
}