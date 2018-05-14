import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

class Playlist extends React.Component {
constructor(props){
  super(props);
  //Bind the current value of this to .handleNameChange().
  this.handleNameChange = this.handleNameChange.bind(this);
}
  handleNameChange(x){
     //accepts an event that is triggered by an onChange attribute in the <input> element
      const name = x.target.value;
      this.props.onNameChange(name);
  }
  render(){
    return (
      <div className="Playlist">
        <input value="New Playlist" onChange={this.handleNameChange}/>
        <TrackList track={this.props.playlistTracks} onRemove={this.props.onRemove}/>
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}
export default Playlist;
