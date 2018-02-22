import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Review from "./Review";

class TeacherPage extends Component{
    constructor(props) {
        super(props);
        this.url = "https://roast-my-teacher-backend.herokuapp.com/api/roasts/";
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getData = this.getData.bind(this);
        this.state = {
            display: [],
            ave: 0,
            total: 0,
            roast: "",
        };
    }
    componentDidMount(){
        this.getData();
    }
    getData(){
        let ave = 0;
        axios.get(this.url + this.props.match.params.id)
            .then((response) => {
                for(let i = 0; i < response.data.length; i++){
                    ave += parseInt(response.data[i].review, 10)
                }
                const items = (response.data.map((x) =>
                    <li key={x._id}>{x.toast}</li>
                ));
                const rev = ave/response.data.length;
                console.log(rev);
                if(isNaN(rev)){
                    this.setState({display: items, total: (<Review number={0}/>), refer: this.props.match.params.id})
                }
                else{
                    this.setState({display: items, total: (<Review number={rev}/>), refer: this.props.match.params.id})
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    handleChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        axios.post('https://roast-my-teacher-backend.herokuapp.com/api/roasts/', {refer: this.state.refer, review: this.state.review, toast: this.state.roast})
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.getData();
            })
            .catch(err => {
                console.error(err);
            });
    }
    render() {
        return (
            <div>
                {this.state.total}
                <ul className="list-group" id="table">
                    {this.state.display}
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Review:
                        <input type="number" name="review" onChange={this.handleChange}/>
                    </label>
                    <label>
                        Roast:
                        <input type="text" name="roast" onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <Link to='/teacher'>Back</Link>
            </div>
        )
    }
}

export default TeacherPage