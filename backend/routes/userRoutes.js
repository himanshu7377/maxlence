const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const { isAdmin, verifyJWT } = require('../middleware/authMiddleware');
const upload = require("../middleware/multerMiddleware.js");




router.get('/', userController.getAllUser);
router.get('/:id', userController.getUserById);


// Admin routes
// router.patch('/update', verifyJWT, isAdmin, userController.updateUser);

router.put('/update/avatar', upload.single("avatar"), verifyJWT, userController.updateUserAvatar);
router.patch('/update', verifyJWT, userController.updateUser);
router.delete('/delete', verifyJWT, isAdmin, userController.deleteUser);

module.exports = router;
