'use strict';
// lab 3, task 8
require('es6-promise').polyfill();
require('isomorphic-fetch');

const React = require('react');
const ReactDOMServer = require('react-dom/server');


// Transpile and add the React Component
require("@babel/register")({
    presets: ['@babel/preset-react']
});
// React.createFactory() returns a function that will produce a Header/Footer/MsgBoard element.
const Header = React.createFactory(require('../components/Header.jsx'));
const Footer = React.createFactory(require('../components/Footer.jsx'));
const MsgBoard = React.createFactory(require('../components/MsgBoard.jsx'));


//task 5, step 3, hard-coded data----index handler
const renderIndex = (req, res, msgs) => {
    //res.render() is the function that is going to generate the HTML and send it to the Client Browser.
    res.render('index', {
        title: 'ICS 221 Universal JS Msg Board',
        //ReactDOMServer.renderToString() to render our React Components on the Server
        header: ReactDOMServer.renderToString(Header()),
        footer: ReactDOMServer.renderToString(Footer()),
        msgBoard: ReactDOMServer.renderToString(MsgBoard(
            { messages: msgs }
            // above line of code: passing msgs as a props for the state variable: messages
        )),
        //The props key below msgBoard renders a script tag with the msgs array reversed as JSON.
        //This is for passing messages to the client-side code on initial render.It's reversed because 
        //the client-side MsgBoard will render it that way and they have to match.
        props: '<script>let messages=' + JSON.stringify(msgs) +
            '</script>'
    });
};

const getMessages = (req, res) => {
    fetch(`${process.env.API_URL}/msgs`)
        .then(response => handleHTTPErrors(response))
        .then(result => result.json())
        .then(result => {
            if (!(result instanceof Array)) {
                console.error('API lookup error');
                result = [];
            } else {
                renderIndex(req, res, result);
            }
        })
        .catch(error => {
            console.log(error);
        });
}

function handleHTTPErrors(response) {
    if (!response.ok) throw Error(response.status + ': ' + response.statusText);
    return response;
}

module.exports = {
    getMessages
};






















//task 5, step 3, hard-coded data
// const msgs = [
//     { id: 1, name: 'Bill', msg: 'Hi All!' },
//     { id: 2, name: 'Ann', msg: 'ICS 221 is fun!' },
//     { id: 3, name: 'John', msg: 'Howdy!' },
//     { id: 4, name: 'Barb', msg: 'Hi' },
//     { id: 5, name: 'Frank', msg: 'Who\'s tired?' },
//     { id: 6, name: 'Sarah', msg: 'I heart React' }
// ];