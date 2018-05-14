import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props){
    super(props);
    //bind this.addTrack() to the current value of this
    this.addTrack = this.addTrack.bind(this);
    //bind this.removeTrack() to the current value of this
    this.removeTrack = this.removeTrack.bind(this);
  }
  addTrack(){
    //Pass this.props.track to this.props.onAdd
   this.props.onAdd(this.props.track);
    }
    removeTrack(){
      //remove this.props.track from the playlist.
      this.props.onRemove(this.props.track);
    }

  renderAction(){
    if(this.props.isRemoval){
      return <a className="Track-action" onClick={this.removeTrack}>-</a>;
    } else {
      return <a className="Track-action" onClick={this.addTrack}>+</a>
    }
  }

  render(){
    return (
      <div className="Track">
        <div className="Track-information">
          <h3> this.props.track.name} </h3>
          <p> {this.props.track.artist} | {this.props.track.album} </p>
        </div>
        <a className="Track-action"> + or - will go here</a> // try {this.renderAction()}
      </div>
    )
  }
}
export default Track;
