const Router = require('express');
const router = new Router();
const { Device } = require('../models/models');
const { Op } = require('sequelize');

// Роут для поиска товаров
router.get('/', async (req, res) => {
  const { query } = req.query;

  try {
    // Ищем товары по запросу
    const devices = await Device.findAll({
      where: {
        name: {
          [Op.iLike]: `%${query}%`, // Используем оператор iLike для поиска по частичному совпадению имени
        },
      },
    });

    res.json(devices);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка сервера');
  }
});

module.exports = router;
