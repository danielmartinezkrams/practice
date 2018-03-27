import React, {Component} from 'react';
import axios from "axios";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from "../../node_modules/material-ui/Table";
import Roasts from "./Roasts";
import logo from "../img/logo.png";

class Home extends Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            display: []
        };
        this.url = "https://roast-my-teacher-backend.herokuapp.com/api/roasts/";
    }
    componentDidMount() {
        axios.get(this.url)
            .then((response) => {
                response.data.sort(function(a, b) {
                    a = new Date(a.createDate);
                    b = new Date(b.createDate);
                    return a>b ? -1 : a<b ? 1 : 0;
                });
                const items = (response.data.map((x) =>
                    <Roasts key={x._id} date={x.createDate} teacher={x.refer} review={x.review} toast={x.toast} from={x.from} name={x.name}/>
                ));
                this.setState({display: items});
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    render() {
        const isLoggedIn = this.props.isLoggedIn;
        let welcome = null;
        if(isLoggedIn){
            welcome = <h4>Welcome {this.props.info.first} {this.props.info.last}</h4>
        }
        return (
            <div className="home">
                <div className="header">
                    <h1 className="App-title">Home</h1>
                    {welcome}
                    <img id="logo" className="App-logo" alt="small blue logo" src={logo}/>
                </div>

                    <Table className="table" bodyStyle={{overflow:'visible'}} fixedHeader={true} selectable={false}>
                       <TableHeader displaySelectAll={false}>
                           <TableRow>
                               <TableHeaderColumn colSpan="5" style={{textAlign: 'center'}}>
                                   Latest Roasts
                               </TableHeaderColumn>
                           </TableRow>
                            <TableRow>
                                <TableHeaderColumn>Teacher</TableHeaderColumn>
                                <TableHeaderColumn>Date</TableHeaderColumn>
                                <TableHeaderColumn>Review</TableHeaderColumn>
                                <TableHeaderColumn>Roast</TableHeaderColumn>
                                <TableHeaderColumn>Chef</TableHeaderColumn>
                            </TableRow>
                       </TableHeader>
                        <TableBody>
                            {this.state.display}
                        </TableBody>
                    </Table>
            </div>
        )
    }
}

export default Home