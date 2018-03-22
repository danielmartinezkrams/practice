import React, {Component} from 'react';
import logo from "../img/logo.png";
import axios from "axios";
import {Link } from 'react-router-dom';
import {TableRowColumn, TableRow, TableHeaderColumn, TableBody, Table, TableHeader} from "../../node_modules/material-ui/Table";
import Roasts from "./Roasts"

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handler = this.handler.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.logout = this.logout.bind(this);
        this.getData = this.getData.bind(this);
        this.url = "https://roast-my-teacher-backend.herokuapp.com/api/";
        this.state = {
            isLoggedIn: this.props.isLoggedIn,
            alert: false,
            selected: 1
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
                        _id: response.data._id,
                        from: response.data.first + " " + response.data.last + " " + response.data.class
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
            this.getData()
        }
    }

    getData(){
        axios.get(this.url + "roasts/")
            .then((response) => {
                let items = [];
                let display = null;
                if(response.data.length < 1){
                    this.setState({display: <TableRow><TableRowColumn>No reviews yet</TableRowColumn></TableRow>})
                }
                else{
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].from === this.props.info.studentID) {
                            items.push(response.data[i])
                        }
                    }
                    display = (items.map((x, index) =>
                        <Roasts key={x._id} number={index} function={this.handler} id={x._id} date={x.createDate} teacher={x.refer} review={x.review} toast={x.toast} from={x.from} selectable={true} name={x.name}/>
                    ));
                }
                this.setState({display: display, items: items});
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    closeAlert() {
        this.setState({ alert: false });
    }
    logout(){
        this.setState({
            isLoggedIn: false,
            info: ""
        });
        this.props.function(false, "");
    }
    handler(index){
        console.log(index + this.state.selected);
        if(this.state.selected == index){
            console.log("hi");
            return true
        }
        return false
    };
    handleRowSelection = (selectedRows) => {
        console.log(selectedRows);
        this.setState({
            selected: selectedRows,
        });
    };
    handleDelete(){
        axios.delete(this.url + "roasts/" + this.state.items[this.state.selected]._id)
            .then((response) => {
                this.getData()
            })
            .catch(function (error) {
                console.log(error);
            })
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
                        <Table className="table" multiSelectable={true} onRowSelection={this.handleRowSelection}>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderColumn>Teacher</TableHeaderColumn>
                                    <TableHeaderColumn>Date</TableHeaderColumn>
                                    <TableHeaderColumn>Review</TableHeaderColumn>
                                    <TableHeaderColumn>Roast</TableHeaderColumn>
                                    <TableHeaderColumn>Chef</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={true}>
                                {this.state.display}
                            </TableBody>
                        </Table>
                    <button onClick={this.handleDelete}>Delete</button>
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
                    <input className="idCheck" name="id" type="text" onChange={this.handleChange}/>
                    <input className="confirmButton" type="submit" value="Submit"/>
                    <p>Enter last 4 digits of student ID and day of birth (ex: 012301)</p>
                </form>
            </div>
        );
    }
}

function isEmpty(obj) {
    if (obj === null) return true;
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