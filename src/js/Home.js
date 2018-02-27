import React, {Component} from 'react';
import axios from "axios";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
        };
        this.url = "https://roast-my-teacher-backend.herokuapp.com/api/teachers/";
        this.loadFromServer = this.loadFromServer.bind(this);
    }
    loadFromServer() {
        axios.get(this.url)
            .then(function (response) {
              console.log(response)
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
                    Welcome {this.state.name}
                </p>
            </div>
        )
    }
}

export default Home