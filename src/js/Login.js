import React, {Component} from 'react';
import logo from "../img/logo.png";
import axios from "axios";
import {Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import Roasts from "./Roasts"

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.logout = this.logout.bind(this);
        this.url = "https://roast-my-teacher-backend.herokuapp.com/api/";
        this.state = {
            isLoggedIn: this.props.isLoggedIn,
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
        axios.get(this.url + "students/" + this.state.id)
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
                    this.props.function(this.state.isLoggedIn, info);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    componentDidMount(){
        if(this.state.isLoggedIn) {
            axios.get(this.url + "roasts/")
                .then((response) => {
                    let items = [];
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].from === this.props.info.studentID) {
                            items.push(response.data[i])
                        }
                    }
                    const display = (items.map((x) =>
                        <Roasts key={x._id} date={x.createDate} teacher={x.refer} review={x.review} toast={x.toast} from={x.from}/>
                    ));
                    this.setState({display: display});
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }
    closeAlert() {
        this.setState({ alert: false });
    }
    logout(){
        this.setState({
            isLoggedIn: false,
            info: ""
        });
    }
    render() {
        let alert = null;
        if(this.state.alert){
            if (!this.state.isLoggedIn) {
                alert = <div className="alert">Login Unsuccessful<button onClick={() => this.closeAlert()}>Try Again</button></div>;
            } else {
                let to = "/";
                const array = this.props.match.params;
                if(!isEmpty(array)){
                    to = "/teacher/" + array.refer
                }
                alert = <div className="alert">{this.state.info.first} {this.state.info.last} Login Successful <Link onClick={() => this.closeAlert()} to={to}>Continue</Link></div>
            }
        }
        else if(this.state.isLoggedIn){
            return (
                <div className="Login">
                    <h3>
                    {this.props.info.first} {this.props.info.last}<br/>
                    {this.props.info.class}
                    </h3>
                    <button onClick={this.logout}>Log Out</button>
                    <h4>My roasts</h4>
                    <Scrollbars className="scrollBar" style={{ width: "90%", height: 500}}>
                        <table className="table">
                            <tbody>
                            <tr>
                                <th>Teacher</th>
                                <th>Date</th>
                                <th>Review</th>
                                <th>Roast</th>
                                <th>Chef</th>
                            </tr>
                            {this.state.display}
                            </tbody>
                        </table>
                    </Scrollbars>
                </div>
            )
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