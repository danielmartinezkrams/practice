import React, {Component} from 'react';
import {Link } from 'react-router-dom'

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.url = "https://roast-my-teacher-backend.herokuapp.com/api/roasts/";
        this.state = {
            data: "",
            display: []
        };
    }

    render() {
        return (
            <li>
                <Link to={`/teacher/${this.props.id}`}>
                    {this.props.firstName + " " + this.props.lastName + ", " + this.props.subject}
                </Link>
            </li>
        )
    }
}

export default ListItem