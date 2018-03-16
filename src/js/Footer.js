import React, {Component} from 'react';
import {Link } from 'react-router-dom';
import icon from "../img/icon-profile.png";
import {Tabs, Tab} from "../../node_modules/material-ui/Tabs";

class Footer extends Component{
    render() {
        return (
            <footer>
                <nav>
                    <Tabs className="footer">
                        <Tab label="Home" containerElement={<Link to="/" />} />
                        <Tab label="Teacher" containerElement={<Link to="/teacher" />} />
                        <Tab containerElement={<Link to="/login" />} icon={<img src={icon} className="profile" alt="profilePic"/>}/>
                    </Tabs>
                </nav>
            </footer>
        )
    }
}

//<img src={icon} className="profile" alt="profilePic"/>

export default Footer