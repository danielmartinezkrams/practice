import React, {Component} from 'react';

class FilterList extends Component {
    constructor(props) {
        super(props);
        this.filterList = this.filterList.bind(this);
        console.log(this.props.display);
        this.state = {items: this.props.display}
    }
    filterList(event){
        let updatedList = this.state.items;
        console.log(updatedList);
        updatedList = updatedList.filter(function(item){
            return item.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        this.setState({items: updatedList});
    }
    render(){
        return (
            <div className="filter-list">
                <form>
                    <fieldset className="form-group">
                        <input type="text" className="form-control form-control-lg" placeholder="Search" onChange={this.filterList}/>
                    </fieldset>
                </form>
                {this.state.display}
            </div>
        );
    }
}


export default FilterList