
// lab7, task 7
const React = require('react');

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.handleText = this.handleText.bind(this);
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }

    handleText(event) {
        if (event.target.id === 'email') {
            this.setState({
                email: event.target.value
            });
            console.log(email);
        } else {
            this.setState({
                password: event.target.value
            });
            console.log(password);
        }
    }

    register(event) {
        this.props.registerCallback();
    }

    login(event) {
        event.preventDefault();
        this.props.loginCallback({
            email: this.state.email,
            password: this.state.password
        });
    }

    render() {
        let loginFailText;

        if (this.props.loginFail) {
            loginFailText = <p className="card-text pt-1 text-danger">Failed Logi Attempt.&nbsp;{this.props.loginAttempts} attempts remaining.</p>
        }

        return (
            <div>
                <form onSubmit={this.login}>
                    <div className="register-group">
                        <div className="row">
                            <label htmlFor="email" className="col-3 col-form-label">
                                Enter Email:
                        </label>
                            <label htmlFor="password" className="col-7 col-form-label">
                                Enter Password:
                        </label>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <input id="email" type="text" className="form-control"
                                    placeholder="Your Email" value={this.state.email}
                                    onChange={this.handleText}
                                />
                            </div>
                            <div className="col-7">
                                <input id="password" type="text" className="form-control"
                                    placeholder="Your Password" value={this.state.password}
                                    onChange={this.handleText}
                                />
                            </div>
                            <div className="col-2">
                                <button type="submit" className="btn btn-primary">
                                    Log in
                                    </button>
                            </div>
                        </div>
                    </div>
                </form>

                {loginFailText}

                <br></br>

                <div className="row">
                    <label htmlFor="register" className="label text-danger bg-warning col-2 col-form-label ml-3">
                        Not Registered?
                    </label>
                    <div className="row">
                        <button className="btn bg-secondary text-white ml-5"
                            onClick={this.register}>
                            Register
                        </button>
                    </div>
                </div>
                <br></br>
            </div >
        )
    }
}

module.exports = Login;