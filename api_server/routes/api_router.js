const express = require('express');
const router = express.Router();
const passport = require('passport');

const msgAPIController = require('../controllers/msg-api');
const userAPIController = require('../controllers/user-api'); // lab7, T3 S4
router.route('/msgs')
    .get(msgAPIController.getAllMessagesOrderedByLastPosted)
    .post(passport.authenticate('basic', { session: false }),
        msgAPIController.addNewMessage);

router.post('/users', userAPIController.registerNewUser);// lab7, T3 S4
router.route('/users/login')
    .get(
        passport.authenticate('basic', { session: false }),
        userAPIController.loginUser
    );// lab7, T3 S4

// the router to get a single message based on an ID: 5c72310b26da64149a06a5a7
router
    .route('/msgs/:messageid')
    .get(msgAPIController.getSingleMessage);

// the router to delete a single message based on an ID: 5c72310b26da64149a06a5a7s
router
    .route('/msgs/:messageid')
    .delete(msgAPIController.deleteMessage);

router
    .route('/msgs/:messageid')
    .patch(msgAPIController.updateMessage);
module.exports = router;

