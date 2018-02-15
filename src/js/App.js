import React, {Component} from 'react';
import '../style/App.css';
import Main from "./Main";
import Footer from "./Footer";

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