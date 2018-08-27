const router     = require('express').Router(),
      { catchErrors } = require('./../errors/handleErrors'),
      UserController = require('./../controllers/User.controller');

router
  .route('/users')
  .get(catchErrors(UserController.getUsers))
  .post(catchErrors(UserController.createUser));

router
  .route('/users/:id')
  .get(catchErrors(UserController.getUserById))
  .post(catchErrors(UserController.updateUserById));

module.exports = router;