const mongoose = require('mongoose');
const messageModel = mongoose.model('message');

// GET Request Handler
const getAllMessagesOrderedByLastPosted = (req, res) => {
    // res.status(200).send('Successful API GET Request'); --replaced by following:
    messageModel
        .find()
        .sort({ '_id': -1 })
        .exec((err, messages) => {
            if (err) {
                res.status(404).json(err);
            } else {
                res.status(200).json(messages);
            }
        });
};

// POST Request Handler
const addNewMessage = (req, res) => {
    // res.status(200).send('Successful API POST Request'); --replaced by following
    messageModel
        .create(req.body, (err, message) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(201).json(message);
            }
        });

};

const deleteMessage = (req, res) => {
    if (req.params && req.params.messageid) {
        messageModel
            .findById(req.params.messageid)
            .exec((err, message) => {
                // error in executing function
                if (err) {
                    res.status(400).json(err);
                    return;
                }

                // could execute, but didn't find message
                if (!message) {
                    res.status(404).json({
                        "api-msg": "messageid not found"
                    });
                    return;
                }

                // found message
                //res.status(200).json(message);
                message.remove((err) => {
                    // error executing function
                    if (err) {
                        return res.status(400).json(err);
                    }

                    // send a 204 No Content back
                    res.status(204).json(null);
                });
            });
    } else {
        // must have a message id
        res.status(400).json({
            "api-msg": "No messageid in request"
        });
    }
};


const getSingleMessage = (req, res) => {
    if (req.params && req.params.messageid) {
        messageModel
            .findById(req.params.messageid)
            .exec((err, message) => {
                // error in executing function
                if (err) {
                    res.status(400).json(err);
                    return;
                }

                // could execute, but didn't find message
                if (!message) {
                    res.status(404).json({
                        "api-msg": "messageid not found"
                    });
                    return;
                }

                // found message
                res.status(200).json(message);
            });
    } else {
        // must have a message id
        res.status(400).json({
            "api-msg": "No messageid in request"
        });
    }
};

const updateMessage = (req, res) => {
    // res.status(200).send('Successful API POST Request'); --replaced by following
    messageModel
        .updateOne({ _id: req.params.messageid }, { msg: req.body.msg }, (err) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).send();
            }
        });

};

module.exports = {
    getAllMessagesOrderedByLastPosted,
    addNewMessage,
    getSingleMessage,
    deleteMessage,
    updateMessage
}