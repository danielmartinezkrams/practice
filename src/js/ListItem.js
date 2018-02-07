import React, {Component} from 'react';
import axios from "axios";
import TeacherPage from "./TeacherPage"

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

export default ListItem