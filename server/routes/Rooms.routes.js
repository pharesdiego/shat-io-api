const router = require('express').Router(),
  { catchErrors } = require('./../errors/handleErrors'),
  RoomControllers = require('./../controllers/Room.controller');

router
  .route('/rooms')
  .get(catchErrors(RoomControllers.getRooms))
  .post(catchErrors(RoomControllers.createRoom));

router
  .route('/rooms/:roomId')
  .get(catchErrors(RoomControllers.getRoomById))
  .post(catchErrors(RoomControllers.updateRoomById));

router.route('/rooms/:roomId/messages').get(catchErrors(RoomControllers.getRoomMessages));

module.exports = router;
