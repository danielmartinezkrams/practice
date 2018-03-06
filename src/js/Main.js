import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom'
import Teacher from "./Teacher";
import Login from "./Login";
import Home from "./Home"

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {loggedIn: false};
        this.handler = this.handler.bind(this)
    }

    handler(x) {
        this.setState({
            loggedIn: true,
            info: x
        })
    }
    render(){
        const isLoggedIn = this.state.loggedIn;
        const info = this.state.info;
        console.log(isLoggedIn + " " + info);
        return(
            <Switch>
                <div className="content">
                    <Route path="/login" render={() => <Login function={this.handler} info={info} loggedIn={isLoggedIn}/>} />
                    <Route exact path="/" render={() => <Home loggedIn={isLoggedIn} info={info}/>}/>
                    <Route path="/teacher" render={() => <Teacher  loggedIn={isLoggedIn} info={info}/>}/>
                </div>
            </Switch>
        )
    }
}

//     <Route path='/login/:refer' render={() => <Login function={this.handler}/>}/>

export default Main