import React, {Component} from 'react';
import Main from "./Main";
import Footer from "./Footer";
import "../Style/App.css"

class App extends Component {
    render() {
        return (
            <div className="App">
                <Main className="Site-content"/>
                <Footer/>
            </div>
        )
    }
}

export default App;