import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Review from "./Review"
import { Scrollbars } from 'react-custom-scrollbars';

class TeacherPage extends Component{
    constructor(props) {
        super(props);
        this.url = "https://roast-my-teacher-backend.herokuapp.com/api/";
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getData = this.getData.bind(this);
        this.state = {
            display: [],
            ave: 0,
            total: 0,
            roast: "",
            name: "",
            review: 0
        };
    }
    getData(){
        let ave = 0;
        axios.get(this.url + "roasts/" + this.props.match.params.id)
            .then((response) => {
                if(response.data.length < 1){
                    this.setState({display: "No reviews yet", total: (<Review number={0}/>), refer: this.props.match.params.id})
                }
                else{
                    for(let i = 0; i < response.data.length; i++){
                        const num = parseInt(response.data[i].review, 10);
                        if(!isNaN(num)){
                            ave += num;
                        }
                    }
                    const items = (response.data.map((x) =>
                        <li key={x._id}><b>{x.review + " "}</b>{x.toast}<p>{x.from}</p></li>
                    ));
                    const rev = Math.round(ave/response.data.length);
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
            axios.post(this.url + "roasts/", {refer: this.state.refer, review: this.state.review, toast: this.state.roast, from: this.props.info._id})
                .then(res => {
                    this.getData();
                })
                .catch(err => {
                    console.error(err);
                });
    }
    componentDidMount(){
        axios.get(this.url + "teachers/")
            .then((response) => {
                for(let i = 0; i < response.data.length; i++){
                    if(this.props.match.params.id === response.data[i]._id){
                        this.setState({name: response.data[i].first + " " + response.data[i].last})
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        this.getData();
    }
    render() {
        const isLoggedIn = this.props.isLoggedIn;
        let form = null;
        if (isLoggedIn) {
            form = (
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
            );
        }

        else {
            form = <Link to={"/login"}>Log in to Roast</Link>;
        }
        return (
            <div>
                <Link to='/teacher'>Back</Link>
                {this.state.total}
                {this.state.name}
                <br />
                {form}
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