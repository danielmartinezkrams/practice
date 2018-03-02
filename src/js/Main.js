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
            loggedIn: x
        })
    }
    render(){
        const isLoggedIn = this.state.loggedIn;
        console.log(isLoggedIn);
        let routes = null;
        if (isLoggedIn) {
            routes = (
                <div className="content">
                    <Route path="/login" render={() => <Login function={this.handler} loggedIn={isLoggedIn}/>} />
                    <Route exact path="/" render={() => <Home loggedIn={isLoggedIn}/>}/>
                    <Route path="/teacher" render={() => <Teacher  loggedIn={isLoggedIn}/>}/>
                </div>
            );
        }
        else {
            routes = (
                <div className="content">
                    <Route exact path="/login" render={() => <Login function={this.handler}/>} />
                    <Route path='/login/:refer' render={() => <Login function={this.handler}/>}/>
                    <Route exact path="/" component={Home}/>
                    <Route path="/teacher" component={Teacher}/>
                </div>
            )
        }
        return(
            <Switch>
                {routes}
            </Switch>
        )
    }
}

export default Main