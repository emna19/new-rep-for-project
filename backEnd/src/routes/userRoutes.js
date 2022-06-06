const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const UserController = require('../controllers/userController');


// update user profile 
router.put('/update', authMiddleware, UserController.updateProfile);

//adding profile api 
router.get('/profile', authMiddleware , UserController.profile )



//adding login api  route
router.post('/login',UserController.login)

router.get('/',  UserController.allUsers)
  
router.get('/:id', UserController.userById)
  
router.post('/', UserController.createUser);

// user delete route 
router.delete('/:id', UserController.deleteUser);

/// user update from admin 
router.put('/:id', UserController.updateUserByAdmin) ; 


module.exports = router;