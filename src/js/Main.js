import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom'
import Teacher from "./Teacher";
import Login from "./Login";
import Home from "./Home"
import PrivateRoute from "./PrivateRoute";

class Main extends Component {
    render(){
        return(
            <Switch>
                <div className="content">
                    <Route path='/login' component={Login} />
                    <PrivateRoute exact path="/" component={Home}/>
                    <PrivateRoute path="/teacher" component={Teacher}/>
                </div>
            </Switch>
        )
    }
}

export default Main