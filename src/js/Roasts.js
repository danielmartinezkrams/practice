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
        if(this.props.teacher !== undefined){
            axios.get(this.url + "teachers/" + this.props.teacher)
                .then((res) => {
                    this.setState({teacher: res.data.first + " " + res.data.last});
                })
                .catch(err => {
                    console.error(err);
                });
        }

    }
    closeAlert(){
        this.setState({ hidden: "hidden" });
    }
    render(){
        let teacher = null;
        if(this.props.teacher !== undefined){
            teacher = <td>{this.state.teacher}</td>;
        }
        let d = new Date(this.props.date);
        let del = null;
        if(this.props.deleteButton){
            console.log(this.props.id);
            del = <td><button onClick={() =>
                axios.delete(this.url + "roasts/" + this.props.id)
                    .catch(function (error) {
                        console.log(error);
                    })
            }>X</button></td>
        }
        return(
            <tr>
                {teacher}
                <td>{d.toDateString()}</td>
                <td><b>{this.props.review}</b></td>
                <td>{this.props.toast}</td>
                <td>{this.props.name}</td>
                {del}
            </tr>
        )
    }
}
/*
    axios.get(this.url + "students/" + this.props.from)
            .then((res) => {
                this.setState({from: res.data.first + " " + res.data.last + " " + res.data.class});
            })
            .catch(err => {
                console.error(err);
            });
            return <div style={ {visibility : this.state.hidden }} id="deleteAlert">Successful Delete<button onClick={() => this.closeAlert()}>Close</button></div>;
                    })
 */

export default Roasts;