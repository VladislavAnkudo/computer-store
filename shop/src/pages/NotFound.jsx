import {useNavigate} from "react-router-dom"
import notfound  from "../assets/images/notfound.png";

export const NotFound = () =>{
    const navigate = useNavigate()
    const goHome = () => navigate('/')
    return (
        <div className="wrapper">
            <div className="notfound" style={{display: 'flex', flexDirection: "column", alignItems: 'center', margin: '50px 0 50px', gap: "35px"}}>
                <img src={notfound} alt="" />
                <div className="notfound__title" style={{fontSize: '36px'}}>Что-то пошло не так</div>
                <div className="notfound__subtitle" style={{fontSize: '24px'}}>Возможно вы не верно указали страницу или сайт пока недоступен</div>
                <button onClick={goHome} className="notfound__button" style={{background: "#015ADE", border: 'none', cursor:'pointer' , width: '330px', height: '60px', fontSize: '20px', color: 'white'}}>вернуться на главную</button>
            </div>
        </div>
    )
}