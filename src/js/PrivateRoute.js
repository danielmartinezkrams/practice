import React, {Component} from 'react';
import {Route, Redirect, withRouter} from 'react-router-dom';

class PrivateRoute extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Route render={(props) => (
                auth.isAuthenticated === true
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }} />
            )} />
        )

    }
}

const auth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100)
    },
    signOut(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100)
    }
};

const AuthButton = withRouter(({ history }) => (
    auth.isAuthenticated ? (
        <p>
            Welcome! <button onClick={() => {
            auth.signOut(() => history.push('/'))
        }}>Sign out</button>
        </p>
    ) : (
        <p>You are not logged in.</p>
    )
));

export default PrivateRoute