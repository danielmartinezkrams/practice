import React, {Component} from 'react';
import axios from "axios";
import logo from "../img/logo.png";
import ListItem from "./ListItem";
//import { Scrollbars } from 'react-custom-scrollbars';

class TeacherList extends Component {
    constructor(props) {
        super(props);
        this.data = "";
        this.componentDidMount = this.componentDidMount.bind(this);
        this.filterList = this.filterList.bind(this);
        this.url = "https://roast-my-teacher-backend.herokuapp.com/api/teachers/";
        this.state = {
            data: "",
            display: []
        };
    }
    componentDidMount(){
        axios.get(this.url)
            .then((response) => {
                let items = [];
                for(let i = 0; i < response.data.length; i++){
                    items.push(response.data[i])
                }
                items.sort(function(a, b){
                    if(a.last < b.last) return -1;
                    if(a.last > b.last) return 1;
                    return 0;
                });
                const display = (items.map((x) =>
                    <ListItem key={x._id} firstName={x.first} lastName={x.last} value={x.first + x.last} id={x._id} subject={x.subject}/>
                ));
                this.setState({items: display, display: display})
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    filterList(event){
        const permList = this.state.items;
        let updatedList = permList.filter(function(item){
            return (item.props.firstName.toLowerCase().search(event.target.value.toLowerCase()) !== -1 || item.props.lastName.toLowerCase().search(event.target.value.toLowerCase()) !== -1);
        });
        this.setState({display: updatedList});
    }

    render() {
        return (
            <div className="teacher">
                <div className="header">
                    <h1 className="App-title">Teachers</h1>
                    <img id="logo" className="App-logo" alt="small blue logo" src={logo}/>
                </div>
                <div>

                        <div className="filter-list">
                            <form>
                                <fieldset className="form-group">
                                    <input type="text" className="form-control form-control-lg" placeholder="Search" onChange={this.filterList}/>
                                </fieldset>
                            </form>
                            <ul className="list-group">
                                {this.state.display}
                            </ul>
                        </div>
                </div>
            </div>
        )
    }
}

/*
for(let o = 0; o < list.length; o++) {
                        if (response.data[i].name === list[o].name){
                            list[o].subject = [list[o].subject, response.data[i].subject];
                        }

                    }
 */

export default TeacherList