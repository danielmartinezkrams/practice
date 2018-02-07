import React, {Component} from 'react';
import '../style/App.css';
import logo from "../img/logo.png";
import {Route, NavLink, HashRouter} from "react-router-dom";
import '../style/App.css';
import ReactDOM from "react-dom";
import axios from "axios";
import IdForm from "./IdForm";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: false
        }
    }
    toggleHidden () {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }
    render() {
        return (
            <div className="App">
                <div className="Login">
                    <img src={logo}  alt="logo" id="titleLogo" />
                    <h1 className="App-title">ROAST MY TEACHER</h1>
                    {!this.state.isHidden && <IdForm />}
                </div>
            </div>
        )
    }
}

class Footer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: null,
        };
        console.log(this.state.isLoggedIn);
    }
    render() {
        return (
            <HashRouter>
                <div>
                    <div className="content">
                        <Route exact path="/" component={Home}/>
                        <Route path="/teacher" component={Teacher}/>
                    </div>
                    <ul className="footer">
                        <button className="button"><li><NavLink exact to="/">Home</NavLink></li></button>
                        <button><li><NavLink to="/teacher">Teachers</NavLink></li></button>
                    </ul>
                </div>
            </HashRouter>
        )
    }
}



class Teacher extends Component {
    constructor(props) {
        super(props);
        this.data = "";
        this.componentDidMount = this.componentDidMount.bind(this);
        this.url = "https://roast-my-teacher-backend.herokuapp.com/api/teachers/";
        this.state = {
            data: "",
            display: []
        };
    }

    componentDidMount(){
        let list = [];
        axios.get(this.url)
            .then((response) => {
                for(let i = 0; i < response.data.length; i++){
                    /*
                    let dup = false;
                    for(let o = 0; o < list.length; o++) {
                        if (response.data[i].name === list[o].name){
                            list[o].subject = [list[o].subject, response.data[i].subject];
                            dup = true;
                        }
                    }
                    */
                    list.push(response.data[i])
                }
                console.log(list);
                const items = (list.map((x) =>
                    <ListItem key={x._id} value={x.name} id={x._id} subject={x.subject}/>
                ));
                console.log(items);
                this.setState({display: items})
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render() {
        console.log(this.state.display);
        return (
            <div className="teacher">
            <div className="header">
                <img id="logo" alt="small blue logo" src={logo}/>
                <h1 id="title">Teachers</h1>
            </div>
            <div>
                <ul className="list-group" id="table">
                    {this.state.display}
                </ul>
            </div>
            </div>
        )
    }
}

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.url = "https://roast-my-teacher-backend.herokuapp.com/api/teachers/";
        this.state = {
            data: "",
            display: []
        };
    }
    render() {
        return (
            <li onClick={this.handleClick}>{this.props.value + ", " + this.props.subject}</li>
        )
    }
    handleClick(){
        axios.get(this.url + this.props.id)
            .then(res => {
                console.log(res);
                const page = (<TeacherPage key={res.data._id} value={res.data.name} id={res.data._id}/>);
                console.log(page);
                this.setState({display: page})
            })
            .catch(err => {
                console.error(err);
            });
    }
}

class TeacherPage extends Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.url = "https://roast-my-teacher-backend.herokuapp.com/api/roasts/";
        this.state = {
            data: "",
            display: []
        };
    }
    render() {
        return (
            <div>
            </div>
        )
    }
}



class Home extends Component {
    constructor(props) {
        super(props);
        this.name = "";
        this.state = {"pollInterval":2000, "url": "https://roast-my-teacher-backend.herokuapp.com/api/teachers/"};
        this.loadFromServer = this.loadFromServer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    loadFromServer() {
        axios.get(this.state.url)
        .then(function (response) {
            for(let i = 0; i < response.data.length; i++){
            }
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    handleSubmit(x) {
        axios.post(this.state.url, x)
            .then(res => {
                this.setState({ data: res });
            })
            .catch(err => {
                console.error(err);
            });
    }
    componentDidMount() {
        this.loadFromServer();
    }
    render() {
        return (
            <div>
                <h1>Home</h1>
                <p>
                    Welcome {this.name}
                </p>
            </div>
        )
    }
}


ReactDOM.render(
    <App/>,
    document.getElementById("root")
);

export default App;