import React, {Component} from 'react';
import Main from "./Main";
import Footer from "./Footer";
import "../style/App.css"

class App extends Component {
    render() {
        return (
            <div className="App">
                <Main />
                <Footer/>
            </div>
        )
    }
}

export default App;