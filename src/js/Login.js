import React, { Component } from "react";
import logo from "../img/logo.png";
import $ from 'jquery';
import {Route, NavLink, HashRouter} from "react-router-dom";
import Home from "./Home";
import Teacher from "./Teacher";
import PageTwo from "./PageTwo";
import '../style/App.css';
import ReactDOM from "react-dom";

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLoggedIn: false};
    }
    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button = null;
        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
            return <UserGreeting />;
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />;
        }
        return (
            <div className="Login">
                <img src={logo}  alt="logo" id="titleLogo" />
                <h1 className="App-title">ROAST MY TEACHER</h1>
                <div className="confirm">
                    <h3 id="verification">Student Verification</h3>
                    <input type="text" id="idCheck"/>
                    <div>
                        <Greeting isLoggedIn={isLoggedIn} />
                        {button}
                    </div>
                </div>
            </div>
        )
    }
    handleLoginClick() {
        const studentID = $("#idCheck").val();
        console.log(studentID);
        if(studentID.length > 0) {
            $.post(app_url + "/api/login", {"student_id": studentID.toString()}, function (data) {
                const access_token = data["access_token"];
                console.log(data);
                const window = "";
                window.location.href = "/teachers.html?access_token=" + access_token;
            }).fail(function (data) {
                console.log(data);
                window.location = "/error.html"
            });
            this.setState({isLoggedIn: true});
        }
    }
    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }
}

const app_url = "http://ec2-54-183-163-136.us-west-1.compute.amazonaws.com";

class Box extends React.Component{
    constructor(props){
        super(props);
        this.state= {};
    }
    render(){
        return(
            <HashRouter>
                <div>
                    <ul className="footer">
                        <li><NavLink exact to="/">Home</NavLink></li>
                        <li><NavLink to="/Teacher">Teacher</NavLink></li>
                        <li><NavLink to="/PageTwo">PageTwo</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={Home}/>
                        <Route path="/Teacher" component={Teacher}/>
                        <Route path="/PageTwo" component={PageTwo}/>
                    </div>
                </div>
            </HashRouter>
        )
    }
}

function LoginButton(props) {
    return (
        <button id="confirmButton" onClick={props.onClick}>
            Confirm
        </button>
    );
}

function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>
            Logout
        </button>
    );
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />;
    }
    return null;
}

function UserGreeting(props) {
    return <Box></Box>;
}

ReactDOM.render(
    // Try changing to isLoggedIn={true}:
    <Greeting isLoggedIn={false} />,
    document.getElementById('root')
);


export default Login