import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App" style={{background: "#333333"}}>
          <img src={logo}  alt="logo" style={{size:"200%", paddingTop:"100px"}}/>
          <h1 className="App-title" style={{fontFamily:"Roboto, sans-serif", color: "#ffffff", size:"300%", fontWeight: "900", overflow: "visible", textAlign: "center", width: "70%", margin: "auto", lineHeight: "80%", paddingBottom: "8%", paddingTop: "2%"}}>ROAST MY TEACHER</h1>
          <div className="confirm">
              <p id="ver">Student Verification</p>
              <input type="text" /><button id="con" onClick="confirm()">CONFIRM</button>


          </div>
      </div>
    )
  }
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
