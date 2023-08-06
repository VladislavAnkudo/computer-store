import React, { useState } from "react";
import '../CSS/faq_and_other.css'

function Accordion(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  const {title, children} = props;
  return (
    <div className="accordion__section">
      <button className="accordion" onClick={toggleAccordion}>
        <p className={`accordion__title ${isOpen ? "open" : null}`}> {title}</p>
        <span className={`accordion__icon ${isOpen ? "open" : null}`}>
          &#8595;
        </span>
      </button>
      <div
        className={`accordion__content ${isOpen ? "open" : null}`}
        style={isOpen ? { maxHeight: "500px" } : { maxHeight: "0" }}
      >
        <div className="accordion__text">{children}</div>
      </div>
    </div>
  );
}

export  {Accordion};
