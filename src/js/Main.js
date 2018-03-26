import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom'
import Teacher from "./Teacher";
import Login from "./Login";
import Home from "./Home"

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {isLoggedIn: false};
        this.handler = this.handler.bind(this)
    }

    handler(x, y) {
        this.setState({
            isLoggedIn: x,
            info: y
        })
    }

    render(){
        const isLoggedIn = this.state.isLoggedIn;
        const info = this.state.info;
        return(
            <Switch>
                <div className="content">
                    <Route exact path="/login" render={({match}) => <Login match={match} function={this.handler} info={info} isLoggedIn={isLoggedIn}/>} />
                    <Route path="/login/:refer" render={({match}) => <Login match={match} function={this.handler} info={info} isLoggedIn={isLoggedIn}/>} />
                    <Route exact path="/" render={() => <Home isLoggedIn={isLoggedIn} info={info}/>}/>
                    <Route path="/teacher" render={() => <Teacher  isLoggedIn={isLoggedIn} info={info}/>}/>
                </div>
            </Switch>
        )
    }
}

export default Main