const Router = require('express');
const router = new Router();
const { BasketDevice, Order, Basket } = require('../models/models');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, async (req, res) => {
  const { country, firstName, lastName, address, house, city, email, phone, typepay } = req.body;
  const userId = req.user.id;
  try {
    const basket = await Basket.findOne({ where: { userId } });
    if (!basket) {
      res.status(404).send('Корзина не найдена');
      return;
    }
    
    const basketDevices = await BasketDevice.findOne({ where: { basketId: basket.id } });
    const order = await Order.create({
      country, firstName, lastName, address, house, city, email, phone, typepay,
      basketDeviceId: basketDevices.id
    });
  
    res.json({
      orderId: order.id,
      message: 'Заказ оформлен успешно!'
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка сервера');
  }
});
router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.findAll();
    return res.json(orders);
  } catch (error) {
    console.error(error);
  }
});
router.delete('/delete', authMiddleware, async (req, res) => {
  const { id } = req.body;

  try {
    const orders = await Order.findOne({ where: { id } });

    if (!orders) {
      return res.status(404).json({ message: 'Заказ не найдет' });
    }
    await orders.destroy();
    return res.json({ message: 'Заказ удалён' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
});
module.exports = router;
