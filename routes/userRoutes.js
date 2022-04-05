const router = require('express').Router();
const usersController = require('../controllers/usersController');
const authorize = require("../middleware/authorize");

router.route('/')
   .get(usersController.getAll)
   .post(usersController.register);
   
router.route('/login').post(usersController.login);
router.route('/current').get( authorize, usersController.current);

router.route('/:userId')
   .get(usersController.getOne)
   .delete(usersController.deleteUser);


module.exports = router;
