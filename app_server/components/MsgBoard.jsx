
// lab3, task 7
const React = require('react');
const MsgList = require('./MsgList.jsx');
const NewMsg = require('./NewMsg.jsx');
const Login = require('./Login.jsx');
const Registration = require('../../client_side/Registration.jsx');

class MsgBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: this.props.messages,

            email: '',
            password: '',

            loginForm: true,
            loginAttempts: 3,
            loginFail: false,

            registrationForm: false,
            registrationFail: false,

            // F.P.
            loggedInUserId: '',
            loggedInUserName: ''
        };

        this.addMessage = this.addMessage.bind(this);
        this.login = this.login.bind(this); //lab7, T9, S2
        this.register = this.register.bind(this);
        this.addNewUser = this.addNewUser.bind(this);
        this.deleteMsg = this.deleteMsg.bind(this);

    }

    login(userCredentials) {
        const basicString = userCredentials.email.trim() + ':' + userCredentials.password.trim();
        fetch(`${process.env.API_URL}/users/login`, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + btoa(basicString)
            }
        })
            .then(response => {
                if (this.state.loginAttempts === 0) throw 'locked out';
                if (response.status === 200) {
                    this.setState({
                        userCredentials: userCredentials,
                        loginForm: false,
                        loginFail: false,
                    });
                } else {
                    this.setState((state) => {
                        return ({
                            loginFail: true,
                            loginAttempts: state.loginAttempts - 1
                        });
                    });
                }
                return response;
            })
            .then(result => result.json())
            .then(result => {
                this.setState({
                    loggedInUserId: result._id,
                    loggedInUserName: result.username
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    register() {
        this.setState({
            registrationForm: true
        });
    }


    addMessage(message) {
        const basicString = this.state.userCredentials.email + ':'
            + this.state.userCredentials.password;

        fetch(`${process.env.API_URL}/msgs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(basicString)
            },
            body: JSON.stringify(message)
        })
            .then(response => this.handleHTTPErrors(response))
            .then(result => result.json())
            .then(result => {
                this.setState({
                    messages:
                        [result].concat(this.state.messages)
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    addNewUser(userDetails) {
        fetch(`${process.env.API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        })
            .then(response => {
                if (response.status === 201) {
                    this.setState({
                        registrationForm: false,
                        registrationFail: false
                    });
                } else {
                    this.setState({
                        registrationFail: true
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
    // F.P.
    deleteMsg(messageId) {
        const basicString = this.state.userCredentials.email + ':'
            + this.state.userCredentials.password;
        fetch(`${process.env.API_URL}/msgs/` + messageId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => this.handleHTTPErrors(response))
            .then(result => {
                for (let i = 0; i < messages.length; i++) {
                    if (this.state.messages[i]._id == messageId) {
                        this.state.messages.splice(i, 1);
                        break;
                    }
                }

                this.setState({
                    messages: this.state.messages
                });
            })
    }

    render() {
        if (this.state.registrationForm) {
            let failedRegistration;

            if (this.state.registrationFail) {
                failedRegistration =
                    <p className="text-danger">
                        User already Registered or Registration Error.
                    </p>
            }

            return (
                <div>
                    <Registration registerNewUserCallback={this.addNewUser} />
                    {failedRegistration}
                </div>
            )
        } else {
            let form;
            if (this.state.loginForm) {
                form = <Login registerCallback={this.register}
                    loginCallback={this.login}
                    loginFail={this.state.loginFail}
                    loginAttempts={this.state.loginAttempts}
                />
            } else {
                form = <NewMsg addMsgCallback={this.addMessage}
                    userName={this.state.loggedInUserName}
                />
            }

            return (
                <div>
                    {form}
                    <MsgList messages={this.state.messages}
                        userName={this.state.loggedInUserName}
                        deleteMsgCallback={this.deleteMsg} // F.P.
                    />
                </div>
            );
        }
    }

    componentDidMount() {
        fetch(`${process.env.API_URL}/msgs`)
            .then(response => this.handleHTTPErrors(response))
            .then(response => response.json())
            .then(result => {
                this.setState({
                    msgs: result
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleHTTPErrors(response) {
        if (!response.ok) throw Error(response.status + ': ' + response.statusText);
        return response;
    }

}


module.exports = MsgBoard;