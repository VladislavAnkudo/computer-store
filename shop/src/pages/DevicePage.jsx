import React, {useState, useEffect} from "react";
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {fetchOneDevice} from "../http/DeviceApi";
import axios from "axios";

export const DevicePage = () =>{
  const [device, setDevice] = useState({info: []})
  const {id} = useParams()
  const [basketItems, setBasketItems] = useState([]);

  useEffect(() => {
      fetchOneDevice(id).then(data => setDevice(data))
  }, [])

  const handleAddToBasket = (device) => {
    const itemInBasket = basketItems.find((item) => item.device.id === device.id);
  
    if (itemInBasket) {
      if (itemInBasket.count >= device.quantity) {
        alert('Достигнуто максимальное количество товара');
        return;
      }

      const updatedBasketItems = basketItems.map((item) => {
        if (item.device.id === device.id) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      });

      setBasketItems(updatedBasketItems);
      alert('Количество товара в корзине обновлено!');
    } else {
      if (device.quantity === 0) {
        alert('Товар недоступен для добавления в корзину');
        return;
      }

      if (device.quantity <= basketItems.length) {
        alert('Достигнуто максимальное количество товаров');
        return;
      }

      setBasketItems([...basketItems, { device, count: 1 }]);
      alert('Товар успешно добавлен в корзину!');
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}api/basket`, { id: device.id, count: 1 }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  return (
      <div className="wrapper">
          <Container className="mt-3">
          <Row>
              <Col md={4}>
                  <Image width={250} height={250} src={process.env.REACT_APP_API_URL + device.img}/>
              </Col>
              <Col md={4}>
                  <Row className="d-flex flex-column align-items-center">
                      <div>Название: <span className="devicepage__name">{device.name}</span></div>
                      <div>Количество: <span className="devicepage__name">{device.quantity}</span></div>
                  </Row>
              </Col>
              <Col md={4}>
                  <Card
                      className="d-flex flex-column align-items-center justify-content-around"
                      style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                  >
                      <h3>{device.price}$ </h3>
                      <Button variant={"outline-dark"} onClick={() => handleAddToBasket(device)}>Добавить в корзину</Button>
                  </Card>
              </Col>
          </Row>
          <Row className="d-flex flex-column m-3">
              <h1>Характеристики</h1>
              {device.info.map((info, index) =>
                  <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                      {info.title}: {info.description}
                  </Row>
              )}
          </Row>
      </Container>
      </div>
  )
}
