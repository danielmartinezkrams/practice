import React, {Component} from 'react';
import logo from "../img/logo.png";
import {Link} from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isHidden: true,
            redirectToReferrer: false
        };
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        this.setState({value: event.target.value});
    }
    render() {
       return (
                <div className="Login">
                    <img src={logo}  alt="logo" id="titleLogo" />
                    <h1 className="App-title">ROAST MY TEACHER</h1>
                    <form className="confirm">
                        <label id="verification">Student Verification </label>
                        <input id="idCheck" type="text" value={this.state.value} onChange={this.handleChange}/>
                        <button id="confirmButton" type="button"><Link to="/home">Submit</Link></button>
                    </form>
                </div>
            );

    }
}

export default Login