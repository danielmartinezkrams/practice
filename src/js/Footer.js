import React, {Component} from 'react';
import {Route, NavLink, HashRouter} from "react-router-dom";
import Teacher from "./Teacher";
import Home from "./Home"

class Footer extends Component{
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

export default Footer