import React, {Component} from 'react';
import {Link } from 'react-router-dom';
import icon from "../img/icon-profile.png";
import {BottomNavigation, BottomNavigationItem} from "../../node_modules/material-ui/BottomNavigation";
import FontIcon from '../../node_modules/material-ui/FontIcon';
import Paper from 'material-ui/Paper';


class Footer extends Component{
    render() {
        return (
            <Paper zDepth={1}>
                <BottomNavigation>
                    <BottomNavigationItem
                        label="Home"
                        containerElement={<Link to="/" />}
                        icon={<FontIcon className="material-icons" />}
                    />
                    <BottomNavigationItem
                        label="Teacher"
                        containerElement={<Link to="/teacher" />}
                        icon={<FontIcon className="material-icons" />}
                    />
                    <BottomNavigationItem
                        label="Profile"
                        style={{marginRight: 24}}
                        containerElement={<Link to="/login" />}
                        icon={<img src={icon} style={{width: "15%", display: "unset"}} className="profile" alt="profilePic"/>}
                    />
                </BottomNavigation>
            </Paper>
        )
    }
}

/*
 <Tabs className="footer">
                        <Tab label="Home" containerElement={<Link to="/" />} />
                        <Tab label="Teacher" containerElement={<Link to="/teacher" />} />
                        <Tab containerElement={<Link to="/login" />} icon={<img src={icon} className="profile" alt="profilePic"/>}/>
                    </Tabs>
 */

export default Footer