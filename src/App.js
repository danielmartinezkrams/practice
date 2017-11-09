import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

class App extends Component {
  render() {
    return (
      <div className="App">
          <img src={logo}  alt="logo" id="titleLogo" />
          <h1 className="App-title">ROAST MY TEACHER</h1>
          <div className="confirm">
              <h3 id="verification">Student Verification</h3>
              <input type="text" id="idCheck"/><button id="confirmButton" onClick={confirm}>CONFIRM</button>
          </div>
      </div>
    )
  }

}

const app_url = "http://ec2-54-183-163-136.us-west-1.compute.amazonaws.com";
//const access_token;
//const fullPath;

const $button = $("#idCheck");
$button.click(function(){
    const studentID = document.getElementById("confirm").value;
    console.log(studentID);
});

function confirm() {
    const studentID = document.getElementById("confirm").value;
    console.log(studentID);
    $.post(app_url + "/api/login", {"student_id": studentID.toString()}, function (data) {
        access_token = data["access_token"];
        console.log(data);
        window.location.href = "/teachers.html?access_token=" + access_token;
    }).fail(function (data) {
        console.log(data);
        window.location = "/error.html"
    });
}

/*class Box extends React.Component{
    constructor(props){
        super(props);
        this.state= {};
    }
    render(){
        return(
            <div className="Box" color={"black"} frameBorder={"black"}>
                <p>Hi</p>
            </div>
        )
    }
}
*/
export default App;
