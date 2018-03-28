import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "../../node_modules/material-ui/Table";
import FlatButton from "../../node_modules/material-ui/FlatButton";
import Slider from "../../node_modules/material-ui/Slider";
import TextField from '../../node_modules/material-ui/TextField';
import Roasts from "./Roasts"

class TeacherPage extends Component{
    constructor(props) {
        super(props);
        this.url = "https://roast-my-teacher-backend.herokuapp.com/api/";
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getData = this.getData.bind(this);
        this.state = {
            display: [],
            total: 0,
            roast: "",
            name: "",
            review: 0
        };
    }
    getData(){
        let ave = 0;
        axios.get(this.url + "roasts/" + this.props.match.params.id)
            .then((response) => {
                if(response.data.length < 1){
                    this.setState({display: <TableRow><TableRowColumn>No reviews yet</TableRowColumn>TableRowColumn></TableRow>, total: (<div className="displayCircle">{0}</div>), refer: this.props.match.params.id})
                }
                else{
                    for(let i = 0; i < response.data.length; i++){
                        const num = parseInt(response.data[i].review, 10);
                        if(!isNaN(num)){
                            ave += num;
                        }
                    }
                    const items = (response.data.map((x) =>
                        <Roasts key={x._id} id={x._id} date={x.createDate} review={x.review} toast={x.toast} from={x.from} name={x.name}/>
                    ));
                    const rev = Math.round(ave/response.data.length);
                    this.setState({display: items, total: (<div className="displayCircle">{rev}</div>), refer: this.props.match.params.id})
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    handleSlider = (event, value) => {
        this.setState({review: value});
    };
    handleSubmit(e) {
        if(this.props.isLoggedIn){
            e.preventDefault();
            axios.post(this.url + "roasts/", {refer: this.state.refer, review: this.state.review, toast: this.state.roast, from: this.props.info.studentID, name: this.props.info.from})
                .then(res => {
                    this.getData();
                    this.setState({roast: "", review: 0})
                })
                .catch((err)=> {
                    console.log(err);
                });
        }
    }
    componentDidMount(){
        axios.get(this.url + "teachers/")
            .then((response) => {
                for(let i = 0; i < response.data.length; i++){
                    if(this.props.match.params.id === response.data[i]._id){
                        this.setState({name: response.data[i].first + " " + response.data[i].last})
                    }
                }
                this.getData();
            })
            .catch((error)=> {
                console.log(error);
            });
    }
    render() {
        let link = null;
        if (!this.props.isLoggedIn) {
            link = <Link to={`/login/${this.state.refer}`}>Login to Roast</Link>;
        }
        console.log(this.state.review + this.state.roast);
        return (
            <div>
                <Link to='/teacher'>Back</Link>
                {this.state.total}
                {this.state.name}
                <br />
                <br />
                <form className="review">
                    {link}
                    <br />
                    <h4>
                       {this.state.review}
                    </h4>
                    <Slider name="review" min={-5} style={{width: "50%", textAlign: "center", display: "inline-block"}} max={5} step={1} defaultValue={0} value={this.state.review} disabled={!this.props.isLoggedIn} onChange={this.handleSlider} required/>
                    <br/>
                    <label>
                        Roast: <TextField type="text" value={this.state.roast} name="roast" disabled={!this.props.isLoggedIn} onChange={this.handleChange} required/>
                    </label>
                    <br/>
                    <FlatButton onClick={this.handleSubmit} backgroundColor={"dodgerblue"} label="Submit" disabled={!this.props.isLoggedIn} />
                </form>
                <br />
                    <Table className="table">
                        <TableHeader displaySelectAll={false} >
                            <TableRow>
                                <TableHeaderColumn>Date</TableHeaderColumn>
                                <TableHeaderColumn>Review</TableHeaderColumn>
                                <TableHeaderColumn>Roast</TableHeaderColumn>
                                <TableHeaderColumn>Chef</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {this.state.display}
                        </TableBody>
                    </Table>
            </div>
        )
    }
}

export default TeacherPage