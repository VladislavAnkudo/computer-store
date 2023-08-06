import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import DeviceItem from './DeviceItem';

const TypeBar = observer(() => {
  const { device } = useContext(Context);
  const [showModal, setShowModal] = useState(false);

  const handleCatalogClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleTypeClick = (type) => {
    device.setSelectedType(type);
    handleCloseModal();
  };

  return (
    <>
      <ListGroup className="typebar">
        <ListGroup.Item
          style={{ cursor: 'pointer' }}
          onClick={handleCatalogClick}
          className="listgroup"
        >
          Каталог &gt;
        </ListGroup.Item>
      </ListGroup>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Каталог</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {device.types.map((type) => (
            <ListGroup.Item
              style={{ cursor: 'pointer' }}
              active={type.id === device.selectedType.id}
              onClick={() => handleTypeClick(type)}
              key={type.id}
              className="listgroup"
            >
              {type.name}
            </ListGroup.Item>
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
});

export default TypeBar;
