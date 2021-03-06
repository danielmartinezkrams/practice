import React, {Component} from 'react';
import TeacherList from "./TeacherList";
import TeacherPage from "./TeacherPage";
import { Switch, Route } from 'react-router-dom'

class Teacher extends Component {
     render() {
         const isLoggedIn = this.props.isLoggedIn;
         let info = null;
         if(isLoggedIn){
             info = this.props.info;
         }
         return (
            <Switch>
                <Route exact path='/teacher' component={TeacherList}/>
                <Route path='/teacher/:id'  render={({ match }) => ( <TeacherPage  match={match} isLoggedIn={isLoggedIn} info={info}/> )} />}) />
            </Switch>
        )
    }
}

export default Teacher