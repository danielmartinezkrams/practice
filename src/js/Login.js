import React, {Component} from 'react';
import logo from "../img/logo.png";
import axios from "axios";

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.url = "https://roast-my-teacher-backend.herokuapp.com/api/students/";
        this.state = {
            isLoggedIn: false
        };
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
                    alert("Login unsuccessful")
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
        return (
            <div className="Login">
                <img src={logo}  alt="logo" className="titleLogo" />
                <h1 className="App-title">ROAST MY TEACHER</h1>
                <form className="confirm" onSubmit={this.handleSubmit}>
                    <label className="verification">Student Verification </label>
                    <input className="idCheck" name="id" type="text" onChange={this.handleChange}/>
                    <input className="confirmButton" type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
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