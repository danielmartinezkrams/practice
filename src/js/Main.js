import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom'
import Teacher from "./Teacher";
import Login from "./Login";
import Home from "./Home"

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {loggedIn: false}
    }
    render(){
        return(
            <Switch>
                <div className="content">
                    <Route path='/login' component={Login} />
                    <Route exact path="/" component={Home}/>
                    <Route path="/teacher" component={Teacher}/>
                </div>
            </Switch>
        )
    }
}

export default Main