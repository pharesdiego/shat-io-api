const router = require('express').Router(),
  { catchErrors } = require('./../errors/handleErrors'),
  MessageController = require('./../controllers/Message.controller');

router
  .route('/messages')
  .get(catchErrors(MessageController.getMessages))
  .post(catchErrors(MessageController.createMessage));

router
  .route('/messages/:messageId')
  .get(catchErrors(MessageController.getMessageById))
  .post(catchErrors(MessageController.updateMessageById));

module.exports = router;
