import React, {Component} from 'react';
import '../style/App.css';
import logo from "../img/logo.png";
import '../style/App.css';
import ReactDOM from "react-dom";
import IdForm from "./IdForm";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: false
        }
    }
    toggleHidden () {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }
    render() {
        return (
            <div className="App">
                <div className="Login">
                    <img src={logo}  alt="logo" id="titleLogo" />
                    <h1 className="App-title">ROAST MY TEACHER</h1>
                    {!this.state.isHidden && <IdForm />}
                </div>
            </div>
        )
    }
}


ReactDOM.render(
    <App/>,
    document.getElementById("root")
);

export default App;