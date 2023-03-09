const express = require('express');
const userCon = require('../controllers/userController');
const {userValidation, accessValidation} = require('../middlewares/userValidation')




const router = express.Router();


router.post("/register", userValidation,userCon.userRegister);

router.post("/login", userCon.userLogin);

router.get("/get", accessValidation,userCon.getUser);

router.put("/delete",accessValidation,userCon.deleteUser);

router.get("/list/:",userCon.userList)


module.exports = router;