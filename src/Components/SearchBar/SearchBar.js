import React from 'react';
import './SearchBar.css';
class SearchBar extends React.Component {
  constructor(props){
    super(props);
    //bind the current value of this to .search()
    this.search = this.search.bind(this);
    //bind the current value of this to this.handleTermChange.
    this.handleTermChange = this.handleTermChange.bind(this);

  }
  handleTermChange(x){
    //Sets the state of the search bar's term to the event target's value.
      const term = x.target.value;
      this.props.onChange(term);
  }
  search(term){
    // passes the state of the term to this.props.onSearch
    this.props.onSearch(this.state.term)
  }
  render(){
    return (
      <div className="SearchBar">
        <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
        <a>SEARCH</a>
      </div>
    )
  }
}
export default SearchBar;
