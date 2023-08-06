import "../CSS/home.css";
import React, {useState, useEffect, useContext} from "react";

import garant from "../assets/icons/garant.svg";
import delivery from "../assets/icons/delivery.svg";
import shop from "../assets/icons/shop.svg";
import support from "../assets/icons/support.svg";
import intel  from "../assets/images/intel.png";
import amd  from "../assets/images/amd.png";
import apple  from "../assets/images/apple.png";
import nike  from "../assets/images/nike.png";


import DeviceList from "../component/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/DeviceApi";
import CreateReview from "../component/modal/CreateReview"; 
import {ReviewList} from '../component/ReviewList'


const  Home = observer(({ devices })  =>{
  const {device} = useContext(Context)
  const [loading, setLoading] = useState(true)
  const [reviewVisible, setReviewVisible] = useState(false)



  const [newsData, setNewsData] = useState([]);
  useEffect(() => {
    fetch('https://newsapi.org/v2/top-headlines?country=ru&category=technology&apiKey=0999686e78904ad6a3e0859281513c54')
      .then(response => response.json())
      .then(data => {
        const responseData = data.articles || [];
        setNewsData(responseData);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);


  useEffect(() => {
      fetchTypes().then(data => device.setTypes(data))
      fetchBrands().then(data => device.setBrands(data))
      fetchDevices(null, null, 1, 9).then(data => {
          device.setDevices(data.rows)
          device.setTotalCount(data.count)
      })
  }, [])

  useEffect(() => {
      fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 9).then(data => {
          device.setDevices(data.rows)
          device.setTotalCount(data.count)
      })
  }, [device.page, device.selectedType, device.selectedBrand,])
  

  const [activeSlide, setActiveSlide] = useState(0);

  const handlePrevSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide === 0 ? 2 : prevSlide - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide === 2 ? 0 : prevSlide + 1));
  };

  const handleSlideChange = () => {
    const sliderContainer = document.querySelector(".slider .devicelist");
    sliderContainer.style.transform = `translateX(-${activeSlide * 30}%)`;
  };

  useEffect(() => {
    handleSlideChange();
  }, [activeSlide]);
  return (
    <div className="wrapper">
      <div className="main__wrapper">
        <div className="main__full-desc">
          <div className="main__title">
            Лучшие цены на компьютеры и комплектующие
          </div>
          <div className="main__subtitle">
            Мы сотрудничаем только с надежными поставщиками, чтобы предложить
            нашим клиентам самые выгодные условия при покупке компьютерной
            техники.
          </div>
          <div className="main__description">
            Наша цель - сделать технологии доступными для каждого.
          </div>
        </div>
      </div>
      <div className="homepage__devices">
        <div className="reviews__switch diveces__line">
            <div className="reviews__title">Популярные товары</div>
            <div className="reviews__arrows">
                <div className="reviews__arrows-left" onClick={handlePrevSlide}></div>
                <div className="reviews__arrows-right" onClick={handleNextSlide}></div>
            </div>
        </div>
       <div className="slider">
        <DeviceList devices={device.devices} />
       </div>
      </div>
      <div className="whychoose">
        <div className="whychoose__head">Почему выбирают нас</div>
        <div className="whychoose__title">
          Интернет-магазин компьютерной техники InfoTech
        </div>
        <div className="whychoose__subtitle">
          InfoTech – интернет магазин, уже более двадцати лет работающий в сфере
          розничной торговли. Сегодня InfoTech предлагает покупателям всю
          технику и комплектующие к вашему компьютеру в своем ассортименте
          новейшими продуктами и решениями от ведущих мировых производителей. У
          нас вы можете приобрести как готовые компьютеры и ноутбуки, так и
          выбрать необходимые комплектующие для самостоятельной сборки
          компьютера.
        </div>
        <div className="whychoose__desc">
            <div className="desc__card">
                <img src={garant} alt="zxc" />
                <div className="desc__title">Гарантия возврата и обмена</div>
            </div>
            <div className="desc__card">
                <img src={delivery} alt="zxc" />
                <div className="desc__title">Быстрая доставка до двери</div>
            </div>
            <div className="desc__card">
                <img src={shop} alt="zxc" />
                <div className="desc__title">Онлайн магазин</div>
            </div>
            <div className="desc__card">
                <img src={support} alt="zxc" />
                <div className="desc__title">24x7 поддержка </div>
            </div>
        </div>
      </div>
      <div className="reviews">
        <div className="reviews__switch">
            <div className="review__add">
              <div className="reviews__title">Отзывы клиентов </div>
              <div 
                onClick={() => setReviewVisible(true)}
                style={{cursor: 'pointer'}}
              > 
                оставьте свой отзыв!
              </div>
              <CreateReview show={reviewVisible} onHide={() => setReviewVisible(false)}/>
            </div>
            <div className="reviews__arrows">
                <div className="reviews__arrows-left"></div>
                <div className="reviews__arrows-right"></div>
            </div>
        </div>
        <ReviewList/>
      </div>
      <div className="news">
        <div className="news__title">Новости</div>
        <div>
              <div style={{'display': 'flex', 'flexWrap':'wrap', 'justifyContent': 'space-between', "alignItems": 'center', 'marginBottom': '100px'}}>
                <div>
                  <div className="news__title-new">Фото: Фил Спенсер у зала федерального суда в Сан-Франциско — Жизнь на DTF - DTF</div>
                  <div className="news__author-new">Автор публикации: DTF</div>
                  <div className="news__date-new">2023-06-24</div>
                </div>
                <div>
                  <div className="news__title-new">Жуткую аварию, после которой в больнице умер 23-летний парень, записала камера наблюдения - Gorod48</div>
                  <div className="news__author-new">Автор публикации: Gorod48</div>
                  <div className="news__date-new">2023-06-24</div>
                </div>
                <div>
                  <div className="news__title-new">Прогресс, которого достигла Intel за 6 лет, наглядно: 6-ваттный 4-ядерный процессор Intel N100 демонстрирует производительность на уровне 65-ваттного Core i5-7400 - iXBT.com - новости техники и технологий</div>
                  <div className="news__author-new">Автор публикации: iXBT.com - новости техники и технологий</div>
                  <div className="news__date-new">2023-06-24</div>
                </div>
              </div>
        </div>
      </div>
      <div className="partner">
      <div className="whychoose__head">Нас поддерживают</div>
        <div className="partner__full">
            <img src={intel} alt="intel" />
            <img src={amd} alt="amd" />
            <img src={apple} alt="apple" />
            <img src={nike} alt="intel" />
        </div>
      </div>
    </div>
  );
})
export { Home };
