import React, {Component} from 'react';


class Review extends Component {
    render(){
        return(
            <div className="displayCircle">
                <h1>{this.props.number}</h1>
            </div>
        )
    }
}

export default Review