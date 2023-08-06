const Router = require('express');
const router = new Router();
const { Review } = require('../models/models');
const uuid = require('uuid');
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', async (req, res) => {
  try {
    // Создание нового отзыва
    const { name, email, message } = req.body;
    const { img } = req.files;

    if (!img) {
      res.status(400).json({ error: 'Отсутствует файл изображения' });
      return;
    }

    let fileName = uuid.v4() + ".jpg";
    img.mv(path.resolve(__dirname, '..', 'static', fileName));

    const review = await Review.create({ name, email, message, img: fileName });

    res.status(201).json({ message: 'Отзыв успешно добавлен!', review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

router.get('/', async (req, res) => {
  try {
    const approvedReviews = await Review.findAll({
      where: {
        moderated: true
      }
    });

    res.json(approvedReviews);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка сервера');
  }
});
router.get('/checkfalse', async (req, res) => {
    try {
      const newReviews = await Review.findAll({
        where: {
          moderated: false
        }
      });
  
      res.json(newReviews);
    } catch (error) {
      console.error(error);
      res.status(500).send('Ошибка сервера');
    }
  });
  // Изменение статуса отзыва на "принят"
router.put('/approve', async (req, res) => {
    const { id } = req.body;
  
    try {
      const review = await Review.findOne({ where: { id } });
  
      if (!review) {
        res.status(404).send('Отзыв не найден');
        return;
      }
  
      review.moderated = true;
      await review.save();
  
      res.send('Отзыв принят');
    } catch (error) {
      console.error(error);
      res.status(500).send('Ошибка сервера');
    }
});
router.delete('/delete', async (req, res) => {
  const { id } = req.body;

  try {
    const review = await Review.findOne({ where: { id } });

    if (!review) {
      res.status(404).send('Отзыв не найден');
      return;
    }

    await review.destroy();

    res.send('Отзыв удален');
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка сервера');
  }
});
  
module.exports = router;
