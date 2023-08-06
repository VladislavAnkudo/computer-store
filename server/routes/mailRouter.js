const Router = require('express');
const router = new Router();
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    service: 'gmail',
    secure: true, // true для использования SSL
    auth: {
      user: process.env.MAIL_CONN, 
      pass: process.env.PASS_CONN
    },
  });

// Обработчик для отправки электронной почты
router.post('/sendemail', (req, res) => {
    const { email } = req.body;
  
    const mailOptions = {
      from: 'InfoTech@gmail.com',
      to: email,
      subject: 'Добро пожаловать на наш сайт InfoTech!',
      html: 
      `
        <h1>Вы подписаны на рассылку наших акций и предложений.</h1>
        <h3>В честь того что вы подписались на нас вы получается промокод на скидку 15% «CURSED»</h3>
        <p>Данное письмо не требует ответа</p>
        <b><h5>С уважением команда <i>InfoTech</i></h5></b>
      `
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Ошибка при отправке письма');
      } else {
        console.log('Email отправлен: ' + info.response);
        res.send('Письмо успешно отправлено');
      }
    });
  });

module.exports = router;
