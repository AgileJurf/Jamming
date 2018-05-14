import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends React.Component {
  render(){
    return (
      <div className="TrackList">
        {this.props.tracks.map (track => { //use .map() on this.props.tracks to render each track in the list.
          return <Track
          track={track}
          key={track.id}
          onAdd={this.props.onAdd}         //pass this.props.onAdd as an attribute called onAdd
          onRemove={this.props.onRemove}
          isRemoval={this.props.isRemoval}/>
            }
          )
        }
          <h1>{this.props.track.name}</h1>
          <h1>{this.props.track.artist}</h1>
          <h1>{this.props.track.album}</h1>
      </div>
    );
  }
}
export default TrackList;
