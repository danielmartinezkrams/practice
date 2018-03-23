import React, {Component} from 'react';
import axios from "axios";
import {TableRow, TableRowColumn} from "../../node_modules/material-ui/Table";

class Roasts extends Component{
    constructor(props) {
        super(props);
        this.url = "https://roast-my-teacher-backend.herokuapp.com/api/";
        this.state = {
            from: "",
            teacher: "",
            selected: [1]
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
            teacher = <TableRowColumn style={boxStyle}>{this.state.teacher}</TableRowColumn>;
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
                <TableRowColumn style={boxStyle}>{d.toDateString()}</TableRowColumn>
                <TableRowColumn style={boxStyle}><b>{this.props.review}</b></TableRowColumn>
                <TableRowColumn style={boxStyle}>{this.props.toast}</TableRowColumn>
                <TableRowColumn style={boxStyle}>{this.props.name}</TableRowColumn>
            </TableRow>
        )
    }
}



const boxStyle = {
    whiteSpace: "unset",
    padding: "5px",
    textAlign: "center"
};


/*
let del = null;

if(this.props.deleteButton){
            console.log(this.props.deleteButton);
            del = <TableRowColumn style={boxStyle}><button onClick={() =>
                axios.delete(this.url + "roasts/" + this.props.id)
                    .catch(function (error) {
                        console.log(error);
                    })
            }>X</button></TableRowColumn>
        }

           {del}


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