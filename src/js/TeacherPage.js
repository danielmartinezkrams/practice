import React, {Component} from 'react';

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

export default TeacherPage