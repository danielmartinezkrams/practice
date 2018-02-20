import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

class TeacherPage extends Component{
    constructor(props) {
        super(props);
        this.url = "https://roast-my-teacher-backend.herokuapp.com/api/roasts/";
        this.state = {
            display: [],
            ave: 0
        };
    }
    componentDidMount(){
        let ave = 0;
        axios.get(this.url + this.props.match.params.id)
            .then((response) => {
                console.log(response);
                for(let i = 0; i < response.data.length; i++){
                    ave += parseInt(response.data[i].review, 10)
                }
                const items = (response.data.map((x) =>
                    <li key={x._id}>{x.toast}</li>
                ));
                this.setState({display: items, review: (ave/response.data.length)})
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    handleSubmit(x) {
        axios.post(this.url, x)
            .then(res => {
                this.setState({ data: res });
            })
            .catch(err => {
                console.error(err);
            });
        axios.post('https://roast-my-teacher-backend.herokuapp.com/api/roasts/', {userId: '1', title: todoTitle, completed: false})
            .then(function (response) {
                resultElement.innerHTML = generateSuccessHTMLOutput(response);
            })
            .catch(function (error) {
                resultElement.innerHTML = generateErrorHTMLOutput(error);
            });
    }
    render() {
        return (
            <div>
                {this.state.review}
                <ul className="list-group" id="table">
                    {this.state.display}
                </ul>
                <Link to='/teacher'>Back</Link>
            </div>
        )
    }
}

export default TeacherPage