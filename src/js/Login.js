import React, {Component} from 'react';
import logo from "../img/logo.png";
import axios from "axios";
import {Link } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.url = "https://roast-my-teacher-backend.herokuapp.com/api/students/";
        this.state = {
            isLoggedIn: false,
            alert: false
        }
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    handleSubmit(e){
        e.preventDefault();
        axios.get(this.url + this.state.id)
            .then((response) => {
                if(response.data === null){
                    this.setState({
                        alert: true
                    });
                }
                else{
                    const info = {
                        class: response.data.class,
                        first: response.data.first,
                        last: response.data.last,
                        studentID: response.data.studentID,
                        _id: response.data._id
                    };
                    this.setState({
                        isLoggedIn: true,
                        alert: true,
                        info: info
                    });
                    this.props.function(info);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        let alert = null;
        if(this.state.alert){
            if (!this.state.isLoggedIn) {
                alert = <Fail/>;
            } else {
                let to = "/";
                const array = this.props.match.params;
                console.log(array);
                if(!isEmpty(array)){
                    to = "/teacher/" + array.refer
                }
                alert = <Success first={this.state.info.first} last={this.state.info.last} to={to}/>;
            }
        }
        return (
            <div className="Login">
                <img src={logo}  alt="logo" className="titleLogo" />
                <h1 className="App-title">ROAST MY TEACHER</h1>
                <br/>
                {alert}
                <form className="confirm" onSubmit={this.handleSubmit}>
                    <label className="verification">Student Verification</label>
                    <p>Enter last 4 digits of student ID and day of birth (ex: 012301)</p>
                    <input className="idCheck" name="id" type="text" onChange={this.handleChange}/>
                    <input className="confirmButton" type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

function Fail(props) {
    return <div className="alert">Login Unsuccessful</div>;
}

function Success(props) {
    return <div className="alert">{props.first} {props.last} Login Successful <Link to={props.to}>Continue</Link></div>;
}

function isEmpty(obj) {
    if (obj == null) return true;
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;
    if (typeof obj !== "object") return true;
    for (const key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
}


/*
 if(this.props.match.params.refer.length > 1){
 this.props.history.push('/teacher' + this.props.match.param.refer);
 }
 else{
 console.log("hi");
 this.props.history.push('/');
 }
 */

export default Login