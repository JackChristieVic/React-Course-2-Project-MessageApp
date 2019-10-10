const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const user = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
        required: true
    },
    username: {
        type: String,
        minlength: 3,
        unique: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 50,
        trim: true,
        required: true
    },
});

// lab7. T5 S4, lab says userSchema.pre(...) but write uses "user.pre(...)" because the schema is called "user"
user.pre('save', function (next) {

    // hash and salt password
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(err => {
            console.log('Error in hashing password' + err);
            next(err);
        });
});

user.methods.verifyPassword = function (inputedPlainTextPassword) {
    const hashedPassword = this.password;
    return bcrypt.compare(inputedPlainTextPassword, hashedPassword);
}
module.exports = mongoose.model('user', user);