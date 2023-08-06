const Router = require('express')
const router = new Router()
const {Basket, BasketDevice, Device} = require('../models/models');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/',authMiddleware, async (req, res) => {
  const { id, count } = req.body;
  const userId = req.user.id; // получаем userId из middleware
  
  try {
    let basket = await Basket.findOne({ where: { userId } });

    if (!basket) {
      basket = await Basket.create({ userId });
    }
    
    let basketDevice = await BasketDevice.findOne({ where: { deviceId: id, basketId: basket.id } });
    if (basketDevice) {
      basketDevice.count += count;
      await basketDevice.save();
      res.send('Количество товара в корзине обновлено!');
    } else {
      const device = await Device.findByPk(id);
      if (!device) {
        res.status(404).send('Устройство не найдено!');
        return;
      }
      await BasketDevice.create({ count, deviceId: id, basketId: basket.id });
      res.send('Товар добавлен в корзину!');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка сервера!');
  }
});
router.get('/', authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const basket = await Basket.findOne({ where: { userId } });
    const basketItems = await BasketDevice.findAll({ where: { basketId: basket.id }, include: Device });
    res.send(basketItems);
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка сервера!');
  }
});
router.get('/ ', authMiddleware, async (req, res) => {
  const userId = req.user.id; // получаем userId из middleware

  try {
    const basketItems = await BasketDevice.findAll({ include: Device, where: { '$basket.userId$': userId } });
    const totalPrice = basketItems.reduce((sum, item) => sum + item.count * item.device.price, 0);
    res.send({ totalPrice });
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка сервера!');
  }
});
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await BasketDevice.destroy({ where: { id } });
    res.send('Товар удален из корзины!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка сервера!');
  }
});


module.exports = router