const express = require('express');
const router = express.Router();

// ../controllers/msg: 1 folder up, ->then controllers folder, ->msg file
// English: import msg.js file from controllers folder which is one directory above this directory.
const msgController = require('../controllers/msg'); //--------lab2, task4


// It forwards a HTTP GET Request of index page(index.jsx file) to a MVC Controller 
// called msgController and a function called index.
router.get('/', msgController.getMessages); //--------lab2, task 4

module.exports = router;