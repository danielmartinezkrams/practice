import React, {Component} from 'react';
import axios from "axios";
import logo from "../img/logo.png";
import ListItem from "./ListItem";
import { Scrollbars } from 'react-custom-scrollbars';

class TeacherList extends Component {
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
        axios.get(this.url)
            .then((response) => {
                const items = (response.data.map((x) =>
                    <ListItem key={x._id} firstName={x.first} lastName={x.last} value={x.first + x.last} id={x._id} subject={x.subject}/>
                ));
                this.setState({display: items})
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render() {
        return (
            <div className="teacher">
                <div className="header">
                    <h1 className="App-title">Teachers</h1>
                    <img id="logo" className="App-logo" alt="small blue logo" src={logo}/>
                </div>
                <div>
                    <Scrollbars className="scrollBar" style={{ width: "90%", height: 500}}>
                        <ul className="list-group" id="table">
                            {this.state.display}
                        </ul>
                    </Scrollbars>
                </div>
            </div>
        )
    }
}

/*
for(let o = 0; o < list.length; o++) {
                        if (response.data[i].name === list[o].name){
                            list[o].subject = [list[o].subject, response.data[i].subject];
                        }

                    }
 */

export default TeacherList