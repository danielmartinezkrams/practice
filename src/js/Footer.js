import React, {Component} from 'react';
import {Link } from 'react-router-dom';
import icon from "../img/icon-profile.png";

class Footer extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: false,
        };
        console.log(this.state.isLoggedIn);
    }
    render() {
        return (
            <footer>
                <nav>
                    <ul className="footer">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/teacher">Teachers</Link></li>
                        <li><Link to ="/login"><img src={icon} className="profile" alt="profilePic"/></Link></li>
                    </ul>
                </nav>
            </footer>
        )
    }
}

export default Footer