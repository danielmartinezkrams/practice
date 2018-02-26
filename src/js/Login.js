import React, {Component} from 'react';
import logo from "../img/logo.png";
import {Route, Link, Redirect, withRouter} from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            isHidden: true,
            redirectToReferrer: false
        };
        this.handleChange = this.handleChange.bind(this);
    }
    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    handleSubmit = event => {
        event.preventDefault();
    };
    render() {
        return (
            <div className="Login">
                <img src={logo}  alt="logo" id="titleLogo" />
                <h1 className="App-title">ROAST MY TEACHER</h1>
                <form className="confirm">
                    <label id="verification">Student Verification </label>
                    <input id="idCheck" name="id" type="text" onChange={this.handleChange}/>
                    <button id="confirmButton" type="button"><Link to="/home">Submit</Link></button>
                </form>
            </div>
        );

    }
}

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100)
    },
    signOut(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100)
    }
};

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        fakeAuth.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
    )} />
);

const AuthButton = withRouter(({ history }) => (
    fakeAuth.isAuthenticated ? (
        <p>
            Welcome! <button onClick={() => {
            fakeAuth.signout(() => history.push('/'))
        }}>Sign out</button>
        </p>
    ) : (
        <p>You are not logged in.</p>
    )
))

export default Login