import { Accordion } from "../component/Accordion";

import React, { useState } from "react";
import FAQ from "../assets/images/FAQ.png";

export const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeAccordion, setActiveAccordion] = useState(null);
  
  const handleClick = (index) => {
    if (index === activeIndex) {
      setActiveAccordion(null);
    } else {
      setActiveIndex(index);
      setActiveAccordion(index);
    }
  };

  const getArrowStyle = (index) => {
    return {
      transform: activeIndex === index ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.3s ease",
    };
  };

  const getTitleStyle = (index) => {
    return {
      color: activeIndex === index ? "#015ADE" : "#333",
    };
  };

 
  return (
    <div className="wrapper">
      <div className="full_faq">
        <div>
            <img src={FAQ} alt="faq"/>
        </div>
        <div className="zxc">
          <Accordion
            index={1}
            title="Как долго занимает доставка и сколько она стоит?"
            onClick={() => handleClick(1)}
            arrowStyle={getArrowStyle(1)}
            titleStyle={getTitleStyle(1)}
            isOpen={activeAccordion === 1}
          >
            <p>
              Мы предлагаем доставку в течение 1-3 рабочих дней в зависимости от
              местоположения и способа доставки. Стоимость доставки зависит от
              веса и габаритов продукта, а также от выбранного способа доставки.
            </p>
          </Accordion>
          <Accordion
            index={2}
            title="Какой уровень защиты данных на продаваемой технике? "
            onClick={() => handleClick(2)}
            arrowStyle={getArrowStyle(2)}
            titleStyle={getTitleStyle(2)}
          >
            <p>
              Мы предлагаем только технику с высоким уровнем защиты данных,
              включая современные антивирусные программы и защиту паролем. Однако,
              защита данных также зависит от настроек пользователя, поэтому мы
              рекомендуем принимать меры предосторожности при использовании
              техники.
            </p>
          </Accordion>
          <Accordion
            index={3}
            title="Могу ли я вернуть или обменять товар?"
            onClick={() => handleClick(3)}
            arrowStyle={getArrowStyle(3)}
            titleStyle={getTitleStyle(3)}
            isOpen={activeAccordion === 3}
          >
            <p>
              Да, мы принимаем возврат и обмен товаров в течение 14 дней с момента
              покупки, если товар не был использован и находится в оригинальной
              упаковке. Обратите внимание, что некоторые товары, такие как
              программное обеспечение и расходные материалы, не подлежат возврату.
            </p>
          </Accordion>
          <Accordion
            index={4}
            title="Какие программы уже установлены на технике?"
            onClick={() => handleClick(4)}
            arrowStyle={getArrowStyle(4)}
            titleStyle={getTitleStyle(4)}
            isOpen={activeAccordion === 4}
          >
            <p>
              Мы устанавливаем операционную систему и базовые программы на
              продаваемую технику. Конкретный набор программ и приложений может
              варьироваться в зависимости от модели и типа техники.
            </p>
          </Accordion>
          <Accordion
            index={5}
            title="Какие опции кастомизации доступны для техники?"
            onClick={() => handleClick(5)}
            arrowStyle={getArrowStyle(5)}
            titleStyle={getTitleStyle(5)}
            isOpen={activeAccordion === 5}
          >
            <p>
              Мы предлагаем различные опции кастомизации в зависимости от типа и
              бренда продаваемой техники, включая выбор компонентов (процессора,
              видеокарты, жесткого диска, оперативной памяти и т.д.), изменение
              внешнего вида (цвет, дизайн), а также добавление дополнительных
              функций и программного обеспечения. При необходимости наши
              специалисты могут помочь в выборе опций кастомизации, которые лучше
              всего соответствуют вашим потребностям.
            </p>
          </Accordion>
          <Accordion
            index={6}
            title="Можете ли вы помочь с настройкой техники?"
            onClick={() => handleClick(6)}
            arrowStyle={getArrowStyle(6)}
            titleStyle={getTitleStyle(6)}
            isOpen={activeAccordion === 6}
          >
            <p>
              Да, мы можем помочь с настройкой и установкой продаваемой техники.
              Мы предлагаем услуги по установке и настройке операционных систем,
              драйверов и приложений на компьютерах, ноутбуках, планшетах и
              смартфонах. Кроме того, мы можем провести обучение и консультации по
              использованию техники. Свяжитесь с нами, чтобы узнать больше о наших
              услугах по настройке и установке техники.
            </p>
          </Accordion>
        </div>
      </div>
    </div>
  );
};
