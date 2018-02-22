import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Review from "./Review";
import { Scrollbars } from 'react-custom-scrollbars';

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
        axios.get("https://roast-my-teacher-backend.herokuapp.com/api/teachers/" + this.props.match.params.id)
            .then((response) => {
                this.setState({name: response.data.value})
            })
            .catch(function (error) {
                console.log(error);
            });
        this.getData();
    }
    getData(){
        let ave = 0;
        axios.get(this.url + this.props.match.params.id)
            .then((response) => {
                for(let i = 0; i < response.data.length; i++){
                    const num = parseInt(response.data[i].review, 10);
                    if(!isNaN(num)){
                        ave += num;
                    }
                }
                console.log(response);
                const items = (response.data.map((x) =>
                    <li key={x._id}><b>{x.review + " "}</b>{x.toast}</li>
                ));
                const rev = Math.round(ave/response.data.length);
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
                    this.getData();
                })
                .catch(err => {
                    console.error(err);
                });
    }
    render() {
        return (
            <div>
                <Link to='/teacher'>Back</Link>
                {this.state.total}
                {this.state.name}
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Review:
                        <input type="range" min={-5} max={5} name="review" defaultValue={0} onChange={this.handleChange} required/>
                        {this.state.review}
                    </label>
                    <br/>
                    <label>
                        Roast:
                        <input type="text" name="roast" onChange={this.handleChange} required/>
                    </label>
                    <br/>
                    <input type="submit" value="Submit" />
                </form>
                <Scrollbars className="scrollBar" style={{ width: "90%", height: 500}}>
                    <ul className="list-group" id="table">
                        {this.state.display}
                    </ul>
                </Scrollbars>
            </div>
        )
    }
}

export default TeacherPage