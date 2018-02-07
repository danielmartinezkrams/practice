import React, {Component} from 'react';

class IdForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isLoggedIn: false,
            isHidden: true,
        };
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    toggleHidden () {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }
    handleChange(event){
        this.setState({value: event.target.value});
    }
    handleLoginClick() {
        this.setState({isLoggedIn: true});
        this.toggleHidden();
        console.log(this.state.value);
    }
    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }
    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button = null;
        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
            return <UserGreeting />;
        } else {
            button = <LoginButton onClick={this.handleLoginClick}/>;
        }
        if(!this.state.isLoggedIn){
            return (
                <form className="confirm" onSubmit={this.handleSubmit}>
                    <label id="verification">Student Verification </label>
                    <input id="idCheck" type="text" value={this.state.value} onChange={this.handleChange}/>
                    {button}
                    {!this.state.isHidden && <Footer isLoggedIn={this.isLoggedIn}/>}
                </form>
            );
        }
        else{
            return null;
        }
    }
}

function LoginButton(props) {
    return (
        <button id="confirmButton" type="button"onClick={props.onClick}>Submit</button>
    )
}

function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>
            Logout
        </button>
    );
}


function UserGreeting(props) {
    return <Footer/>;
}

export default IdForm