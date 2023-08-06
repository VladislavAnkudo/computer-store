import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateBrand from "../component/modal/CreateBrand";
import CreateDevice from "../component/modal/CreateDevice";
import CreateType from "../component/modal/CreateType";
import CreateReview from "../component/modal/CreateReview";
import AcceptReview from "../component/modal/AcceptReview";
import AcceptContact from "../component/modal/AcceptContact";
import AcceptOrder from "../component/modal/AcceptOrder";


export const Admin = () =>{
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)
    const [reviewVisible, setReviewVisible] = useState(false)
    const [acceptVisible, setAcceptReview] = useState(false)
    const [acceptContact, setAcceptContact] = useState(false)

    const [acceptOrder, setAcceptOrder] = useState(false)

    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-dark"}
                className="mt-5 p-2"
                onClick={() => setTypeVisible(true)}
            >
                Добавить тип
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setBrandVisible(true)}
            >
                Добавить бренд
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setDeviceVisible(true)}
            >
                Добавить устройство
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setAcceptReview(true)}
            >
                Добавить отзыв
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setAcceptContact(true)}
            >
                Просмотреть обратную связь
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2 mb-5"
                onClick={() => setAcceptOrder(true)}
            >
                Просмотреть оформленные заказы
            </Button>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateReview show={reviewVisible} onHide={() => setReviewVisible(false)}/>
            <AcceptReview show={acceptVisible} onHide={() => setAcceptReview(false)}/>
            <AcceptContact show={acceptContact} onHide={() => setAcceptContact(false)}/>
            <AcceptOrder show={acceptOrder} onHide={() => setAcceptOrder(false)}/>


        </Container>
    );
}