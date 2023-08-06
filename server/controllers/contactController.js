const {ContactUs} = require('../models/models');
const ApiError = require('../error/ApiError');

class ContactUsController {
    async createContactUs(req, res, next) {
      const { firstName, lastName, email, phone, message } = req.body;
      try {
        const newContactUs = await ContactUs.create({
          firstName,
          lastName,
          email,
          phone,
          message,
        });
        return res.json(newContactUs);
      } catch (error) {
        console.error(error);
        next(ApiError.badRequest(error.message))
      }
    }
    async getContactUsMessages(req, res, next) {
      try {
        const messages = await ContactUs.findAll();
        return res.json(messages);
      } catch (error) {
        console.error(error);
      }
    }
    async deleteContactUsMessage(req, res, next) {
      const { id } = req.body;

      try {
        const contactUsMessage = await ContactUs.findOne({ where: { id } });
    
        if (!contactUsMessage) {
          return res.status(404).json({ message: 'Сообщение обратной связи не найдено' });
        }
        await contactUsMessage.destroy();
        return res.json({ message: 'Сообщение обратной связи успешно удалено' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Ошибка сервера' });
      }
    }
    
  
}
  
  module.exports = new ContactUsController();