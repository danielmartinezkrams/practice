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
        if(this.props.teacher !== undefined){
            teacher = <td>{this.state.teacher}</td>;
        }
        let d = new Date(this.props.date);
        let del = null;
        if(this.props.delete){
            console.log(this.props.refer);
            del = <td><button onClick={() => axios.delete(this.url + "roasts/" + this.props.refer)}>X</button></td>
        }
        return(
            <tr>
                {teacher}
                <td>{d.toDateString()}</td>
                <td><b>{this.props.review}</b></td>
                <td>{this.props.toast}</td>
                <td>{this.state.from}</td>
                {del}
            </tr>
        )
    }
}

export default Roasts;