import React, {Component} from 'react';
import axios from "axios";

class Home extends Component {
    constructor(props) {
        super(props);
        this.name = "";
        this.url = "https://roast-my-teacher-backend.herokuapp.com/api/teachers/";
        this.loadFromServer = this.loadFromServer.bind(this);
    }
    loadFromServer() {
        axios.get(this.url)
            .then(function (response) {
                for(let i = 0; i < response.data.length; i++){
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    componentDidMount() {
        this.loadFromServer();
    }
    render() {
        return (
            <div>
                <h1>Home</h1>
                <p>
                    Welcome {this.name}
                </p>
            </div>
        )
    }
}

export default Home