import React, {Component} from 'react';
import Main from "./Main";
import Footer from "./Footer";
import "../Style/App.css";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
            <div className="App">
                <Main className="Site-content"/>
                <Footer/>
            </div>
            </MuiThemeProvider>
        )
    }
}

export default App;