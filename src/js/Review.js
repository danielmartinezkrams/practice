import React, {Component} from 'react';


class Review extends Component {
    render(){
        return(
            <div className="displayCircle">
                {this.props.number}
            </div>
        )
    }
}

export default Review