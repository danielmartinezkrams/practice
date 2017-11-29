import React, {Component} from 'react';
import $ from 'jquery';


class Home extends Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
                <p>
                    Welcome {getName()}
                </p>
            </div>

        )
    }
}

function getName(){
    console.log($("#idCheck").val());
    return $("#idCheck").val();
}


export default Home