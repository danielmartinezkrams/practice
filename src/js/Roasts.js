import React, {Component} from 'react';
import axios from "axios";
import {TableRow, TableRowColumn} from "../../node_modules/material-ui/Table";

class Roasts extends Component{
    constructor(props) {
        super(props);
        this.url = "https://roast-my-teacher-backend.herokuapp.com/api/";
        this.boxStyle = {
            whiteSpace: "unset",
            padding: "5px",
            textAlign: "center"
        };
        this.state = {
            teacher: "",
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
    render(){
        let teacher = null;
        if(this.props.teacher !== undefined){
            teacher = <TableRowColumn style={this.boxStyle}>{this.state.teacher}</TableRowColumn>;
        }
        let d = new Date(this.props.date);
        let space = null;
        const otherProps = this.props;
        if(this.props.selectable){
            space = otherProps.children[0];
        }
        return(
            <TableRow selectable={this.props.selectable} {...otherProps}>
                {space}
                {teacher}
                <TableRowColumn style={this.boxStyle}>{d.toDateString()}</TableRowColumn>
                <TableRowColumn style={this.boxStyle}><b>{this.props.review}</b></TableRowColumn>
                <TableRowColumn style={this.boxStyle}>{this.props.toast}</TableRowColumn>
                <TableRowColumn style={this.boxStyle}>{this.props.name}</TableRowColumn>
            </TableRow>
        )
    }
}

export default Roasts;