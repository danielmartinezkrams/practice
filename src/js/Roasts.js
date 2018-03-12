import React, {Component} from 'react';
import axios from "axios";

class Roasts extends Component{
    constructor(props) {
        super(props);
        this.url = "https://roast-my-teacher-backend.herokuapp.com/api/";
        this.state = {
            from: "",
            teacher: ""
        }
    }
    componentDidMount() {
        axios.get(this.url + "students/" + this.props.from)
            .then((res) => {
                this.setState({from: res.data.first + " " + res.data.last + " " + res.data.class});
            })
            .catch(err => {
                console.error(err);
            });
        axios.get(this.url + "teachers/" + this.props.teacher)
            .then((res) => {
                this.setState({teacher: res.data.first + " " + res.data.last});
            })
            .catch(err => {
                console.error(err);
            });
    }
    render(){
        let teacher = null;
        console.log(this.props.teacher);
        if(this.props.teacher !== undefined){
            teacher = <td>{this.state.teacher}</td>;
        }
        let d = new Date(this.props.date);
        return(
            <tr>
                {teacher}
                <td>{d.toDateString()}</td>
                <td><b>{this.props.review}</b></td>
                <td>{this.props.toast}</td>
                <td>{this.state.from}</td>
            </tr>
        )
    }
}

export default Roasts;