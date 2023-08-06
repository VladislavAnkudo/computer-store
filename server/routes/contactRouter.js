const Router = require('express')
const router = new Router()
const  contactController  = require("../controllers/contactController");

router.post("/", contactController.createContactUs);
router.get("/", contactController.getContactUsMessages);
router.delete("/", contactController.deleteContactUsMessage);

module.exports = router;