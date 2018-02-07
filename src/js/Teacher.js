import React, {Component} from 'react';
import axios from "axios";
import logo from "../img/logo.png";
import ListItem from "./ListItem"

class Teacher extends Component {
    constructor(props) {
        super(props);
        this.data = "";
        this.componentDidMount = this.componentDidMount.bind(this);
        this.url = "https://roast-my-teacher-backend.herokuapp.com/api/teachers/";
        this.state = {
            data: "",
            display: []
        };
    }

    componentDidMount(){
        let list = [];
        axios.get(this.url)
            .then((response) => {
                for(let i = 0; i < response.data.length; i++){
                    /*
                    let dup = false;
                    for(let o = 0; o < list.length; o++) {
                        if (response.data[i].name === list[o].name){
                            list[o].subject = [list[o].subject, response.data[i].subject];
                            dup = true;
                        }
                    }
                    */
                    list.push(response.data[i])
                }
                console.log(list);
                const items = (list.map((x) =>
                    <ListItem key={x._id} value={x.name} id={x._id} subject={x.subject}/>
                ));
                console.log(items);
                this.setState({display: items})
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render() {
        console.log(this.state.display);
        return (
            <div className="teacher">
                <div className="header">
                    <img id="logo" alt="small blue logo" src={logo}/>
                    <h1 id="title">Teachers</h1>
                </div>
                <div>
                    <ul className="list-group" id="table">
                        {this.state.display}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Teacher