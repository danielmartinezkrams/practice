import React, {Component} from 'react';
import axios from "axios";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from "../../node_modules/material-ui/Table";
import Roasts from "./Roasts"

class Home extends Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            display: [],
            name: "",
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
                let data = [];
                for(let i = 0; i < response.data.length; i++){
                    data[i] = response.data[i]
                }
                const items = (data.map((x) =>
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
        let name = null;
        if(isLoggedIn){
            name = this.props.info.first + " " + this.props.info.last;
        }
        return (
            <div className="home">
                <h1>Home</h1>
                <p>Welcome {name}</p>
                <h4>Latest roasts</h4>
                    <Table className="table" bodyStyle={{overflow:'visible'}} fixedHeader={true} selectable={false}>
                       <TableHeader displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn>Teacher</TableHeaderColumn>
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

export default Home