import React from 'react';
import './App.css';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props){    //Add a constructor function to the App component
    super(props);        //Use super() to call the parent constructor.
    this.state = {       //set this.state to an object
      //with a property called searchResults set to an array of objects
      searchResults: [/*name{}, artist{}, album{}, id{}*/],
      playlistName: 'Number One Playlist',
      playlistTracks: [/*name{}, artist{}, album{}, id{}*/]
    };
      //bind 'this' to all functionality/methods in App.js
      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
      this.updatePlaylistName = this.updatePlaylistName.bind(this);
      this.savePlaylist = this.savePlaylist.bind(this);
      this.search = this.search.bind(this);
  }

    addTrack(track){
      let add = this.state.playlistTracks;
      if (add.find(savedTrack => savedTrack.id === track.id)) {
        return;
          } else {
            add.push(track)
            this.setState({playlistTracks: add})
          }
        }

    removeTrack(track){  //Accepts a track argument

      //Uses the track's id property to filter it out of playlistTracks
      let trackVar = this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id);
        //Sets the new state of the playlist
        this.setState({playlistTracks: trackVar})
      }


    updatePlaylistName(name) {
      //Sets the state of the playlist name to the input argument
      this.setState({playlistName: name})
    }

    savePlaylist(){
      //Generates an array of uri values called trackURIs from the playlistTracks property
      const trackURIs = this.state.playlistTracks.map(track => track.uri);
      Spotify.savePlaylist(this.state.playlistName,trackURIs).then(()=> {
      this.setState({playlistTracks:[]});
      }).then (()=> {this.updatePlaylistName('New Favorite Metal');
    })
  }

    search(term){
      //Accepts a search term
      Spotify.search(term).then(tracks => {
        this.setState({searchResults: tracks});
      });
    }

  render(){
   Spotify.getAccessToken();
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch={this.search}/>
              <div className="App-playlist">
                <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack()}/>
                <Playlist
                onSave={this.savePlaylist}
                playlistName={this.state.playlistName}
                playlistTracks={this.state.playlistTracks}
                onRemove={this.removeTrack()}
                onNameChange={this.updatePlaylistName()}/>
              </div>
            </div>
      </div>
    );
  }
}

export default App;
