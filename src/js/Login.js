import React, {Component} from 'react';
import logo from "../img/logo.png";
import { userActions } from '../Login/actions';

class Login extends Component {
    constructor(props) {
        super(props);
        // reset login status
        //this.props.logout = (userActions.logout());
        this.state = {
            username: '',
            password: '',
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { username } = this.state;
        const { dispatch } = this.props;
        if (username) {
            dispatch(userActions.login(username));
        }
    }
    render() {
        const { loggingIn } = this.props;
        const { username, submitted } = this.state;
        return (
                <div className="Login">
                    <img src={logo}  alt="logo" id="titleLogo" />
                    <h1 className="App-title">ROAST MY TEACHER</h1>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                            <label htmlFor="username">Student ID</label>
                            <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                            {submitted && !username && <div className="help-block">Username is required</div>}
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Verify</button>
                            {loggingIn}
                        </div>
                    </form>
                </div>
            );
    }
}


export default Login