import React, {Component} from 'react';
import axios from "axios";

class Roasts extends Component{
    constructor(props) {
        super(props);
        this.url = "https://roast-my-teacher-backend.herokuapp.com/api/students/";
        this.state = {
            from: ""
        }
    }
    componentDidMount() {
        axios.get(this.url + this.props.from)
            .then((res) => {
                this.setState({from: res.data.first + " " + res.data.last + " " + res.data.class});
            })
            .catch(err => {
                console.error(err);
            });
    }
    render(){
        return(
            <li>
                <b>{this.props.review}</b> {this.props.toast} <b>{this.state.from}</b>
            </li>
        )
    }
}

export default Roasts;