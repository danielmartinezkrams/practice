import React, {Component} from 'react';
import ReactDOM from "react-dom";
import '../style/App.css';
import Login from "./Login";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Login/>
            </div>
        )
    }
}

//const access_token;
//const fullPath;
//const $button = $("#confirmButton");

ReactDOM.render(
    <App/>,
    document.getElementById("root")
);

export default App;