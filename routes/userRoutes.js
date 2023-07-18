const {register} = require('../controllers/userController')
const router = require("express").Router();


router.post("/register",register);
router.post("/login",register);

module.exports = router;