import React, {Component} from 'react';
import logo from "../img/logo.png";
import {Link} from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleChange.bind(this);
        this.handleLogoutClick = this.handleSubmit.bind(this);
        this.state = {
            id: '',
            isLoggedIn: false
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    handleSubmit(e){
        this.setState({
            isLoggedIn: true
        });
        e.preventDefault();
    }
    render() {
        return (
            <div className="Login">
                <img src={logo}  alt="logo" id="titleLogo" />
                <h1 className="App-title">ROAST MY TEACHER</h1>
                <form className="confirm">
                    <label id="verification">Student Verification </label>
                    <input id="idCheck" name="id" type="text" onChange={this.handleChange}/>
                    <button id="confirmButton" type="button"><Link to="/">Submit</Link></button>
                </form>
                <Greeting isLoggedIn={this.state.isLoggedIn} />
            </div>
        );

    }
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
}

function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
}


export default Login