const router = require('express').Router(),
  usersRoutes = require('./Users.routes'),
  roomsRoutes = require('./Rooms.routes'),
  messagesRoutes = require('./Messages.routes');

router.use('/', usersRoutes);
router.use('/', roomsRoutes);
router.use('/', messagesRoutes);

module.exports = router;
