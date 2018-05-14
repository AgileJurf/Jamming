import React from 'react';
import TrackList from '../TrackList/TrackList';
import './SearchResults.css';

class SearchResults extends React.Component {
  render(){
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        //pass this.props.searchResults as an attribute called tracks
        //pass this.props.onAdd as an attribute called onAdd
        <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false}/>
      </div>
    );
  }
}
export default SearchResults;
