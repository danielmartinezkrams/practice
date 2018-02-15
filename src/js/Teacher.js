import React, {Component} from 'react';
import TeacherList from "./TeacherList";
import TeacherPage from "./TeacherPage";
import { Switch, Route } from 'react-router-dom'

class Teacher extends Component {
     render() {
        return (
            <Switch>
                <Route exact path='/teacher' component={TeacherList}/>
                <Route path='/teacher/:id' component={TeacherPage}/>
            </Switch>
        )
    }
}

export default Teacher