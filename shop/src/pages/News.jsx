import "../CSS/news.css";
import React, { useState, useEffect } from "react";

function News() {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/top-headlines?country=ru&category=technology&apiKey=0999686e78904ad6a3e0859281513c54"
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data.articles);
        setloading(false);
      })
      .catch((error) => {
        console.error(error);
        setloading(false);
      });
  }, []);


  return (
    <div className="wrapper">
        <div className="news__page">
            <div className="news-page__full">
              <div>
                <div className="news__title-new">В Шебекино после атаки с беспилотника загорелось промышленное предприятие — Последние новости Белгорода и области - ИА Бел.Ру</div>
                <div className="news__author-new">Автор публикации: ИА Бел.Ру</div>
                <div className="news__date-new">2023-06-24</div>
              </div>
              <div>
                <div className="news__title-new">Земля в Microsoft Flight Simulator 2024 будет живым и динамичным миром — Игромания - Игромания</div>
                <div className="news__author-new">Автор публикации: Игромания</div>
                <div className="news__date-new">2023-06-24</div>
              </div>
              <div>
                <div className="news__title-new">Подборка крутых приложений для Андроид ТВ, которые стоит с... - AndroidInsider.ru</div>
                <div className="news__author-new">Автор публикации: Игромания</div>
                <div className="news__date-new">2023-06-24</div>
              </div>
              <div>
                <div className="news__title-new">Tecno Pova 5 и Pova Neo 3 уже в DNS: характеристики и цены - Mobiltelefon.Ru</div>
                <div className="news__author-new">Автор публикации: ИА Бел.Ру</div>
                <div className="news__date-new">2023-06-24</div>
              </div>
              <div>
                <div className="news__title-new">WSJ: Google начала тестировать игры для YouTube — они будут запускаться прямо через видеосервис — Индустрия на DTF - DTF</div>
                <div className="news__author-new">Автор публикации: ForkLog</div>
                <div className="news__date-new">2023-06-24</div>
              </div>
              <div>
                <div className="news__title-new">Фото: Фил Спенсер у зала федерального суда в Сан-Франциско — Жизнь на DTF - DTF</div>
                <div className="news__author-new">Автор публикации: ForkLog</div>
                <div className="news__date-new">2023-06-24</div>
              </div>
              <div>
                <div className="news__title-new">Жуткую аварию, после которой в больнице умер 23-летний парень, записала камера наблюдения - Gorod48</div>
                <div className="news__author-new">Автор публикации: Gorod48</div>
                <div className="news__date-new">2023-06-24</div>
              </div>
              <div>
                <div className="news__title-new">Прогресс, которого достигла Intel за 6 лет, наглядно: 6-ваттный 4-ядерный процессор Intel N100 демонстрирует производительность на уровне 65-ваттного Core i5-7400 - iXBT.com - новости техники и технологий</div>
                <div className="news__author-new">Автор публикации: Gorod48</div>
                <div className="news__date-new">2023-06-24</div>
              </div>
              <div>
                <div className="news__title-new">Бельгия обязала Binance прекратить деятельность в стране - ForkLog</div>
                <div className="news__author-new">Автор публикации: ForkLog</div>
                <div className="news__date-new">2023-06-24</div>
              </div>
          </div>
        </div>
    </div>
  )
}
export { News };
