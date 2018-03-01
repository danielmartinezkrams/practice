import React, {Component} from 'react';
import logo from "../img/logo.png";
import axios from "axios";
import { Route } from 'react-router-dom'

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
                console.log(response);
                this.setState({
                    isLoggedIn: true,
                    class: response.data.class,
                    first: response.data.first,
                    last: response.data.last,
                    studentID: response.data.studentID,
                    _id: response.data._id
                });
                console.log(this.props.match.params);
                this.props.router.push("/");
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <div className="Login">
                <img src={logo}  alt="logo" id="titleLogo" />
                <h1 className="App-title">ROAST MY TEACHER</h1>
                <form className="confirm" onSubmit={this.handleSubmit}>
                    <label id="verification">Student Verification </label>
                    <input id="idCheck" name="id" type="text" default="009020" onChange={this.handleChange}/>
                    <input type="submit" value="Submit" />
                    <Route render={({history}) => (
                        <button
                            type='button'
                            onClick={() => { history.push(this.props.match.params.id) }}
                        >
                            Click Me!
                        </button>
                    )} />
                </form>
            </div>
        );

    }
}

export default Login