//Use the Implicit Grant Flow to setup user account and make requests
//https://beta.developer.spotify.com/documentation/general/guides/authorization-guide/

const clientID = '310c3781e8764a5fadb6c76011a1cefb';
const redirectURI = "http://localhost:3000/";

let token; //empty variable that will hold the user's access token
let expire;

const Spotify = {
  //This method will get a user's access token so that they can make requests to the Spotify API.
  getAccessToken() {
    //If the access token is not already set, check the URL to see if it has just been obtained.
    let accessToken = window.location.href.match(/access_token=([^&]*)/);
    let expires = window.location.href.match(/expires_in=([^&]*)/);
    if(token) {
      return token;
        //If the access token and expiration time are in the URL
      } else if (token && expire) {
          token = accessToken[1];
          expire = expires[1];
          window.setTimeout(() => token = null, expire * 1000);
          window.history.pushState('Access Token', null, '/');
          return token;
            } else {
              //The third condition is that the access token variable is empty and is not in the URL.
              window.location= `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&redirect_uri=${redirectURI}`;
    }
  },

  savePlaylist(playlistName,trackURIs) {
  token = this.getAccessToken();
  let headers = {"Authorization":`Bearer ${token}`};
  let userID;
  let playlistID;
  if (playlistName && trackURIs) {
    return fetch('https://api.spotify.com/v1/me', {headers: headers}).then(response => {
      return response.json()
    }).then(jsonResponse => {
      userID = jsonResponse.id;
    }).then(() => {
      return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,{
        method:'POST',
        headers:{
          "Authorization":'Bearer '+ token,
          "Content-Type": 'application/json'
        },
        body:JSON.stringify({name:playlistName})
      })
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      playlistID = jsonResponse.id;
    }).then(() => {
      return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,{
        method:'POST',
        headers:{
          "Authorization":`Bearer ${token}`,
          "Content-Type": 'application/json'
        },
        body:JSON.stringify({'uris':trackURIs})
      })
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      playlistID = jsonResponse.id;
  })} else {return;}
},

search(searchTerm) {
  token = this.getAccessToken();
  const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;
  return fetch(searchUrl, {
    headers: {Authorization: `Bearer ${token}`}
  }).then(response => {
    return response.json();
  }).then(jsonResponse => {
    if (jsonResponse.tracks) {
      return jsonResponse.tracks.items.map(track => ({
          id:track.id,
          name:track.name,
          artist:track.artists[0].name,
          album:track.album.name,
          uri:track.uri,
          previewUrl:track.preview_url,
      }));

    } else {
      return [];
    }
  })
}
};

export default Spotify;

/*  search(term) {  //method called search that accepts a parameter for the user's search term.
    this.getAccessToken();
    //return a GET request (using fetch()) to the following Spotify endpoint:
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
    //Add an Authorization header to the request containing the access token.
    headers: { Authorization: `Bearer ${accessToken}` }}).then(response => {
      if(response.ok){
        return response.json();
      }
      throw new Error('Request Failed');
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
      if(jsonResponse.tracks) {
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      }
    });
  },



 savePlaylist(playlistName, trackURIs) {
    this.getAccessToken();

    const headers = { Authorization: `Bearer ${accessToken}`, Content_Type: 'application/json'};
    let userID;
    let playlistID;

    if(!playlistName && !trackURIs){
      return;
    } else {
      return fetch('https://api.spotify.com/v1/me', {headers: headers}
        ).then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Request failed');
        }, networkError => console.log(networkError.message)
        ).then(jsonResponse => {
          return userID = jsonResponse.id;
        }).then(() => {
          return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({name: playlistName})
          }).then(response => {
            if(response.ok) {
              return response.json();
            }
            throw new Error('Request failed');
          }, networkError => console.log(networkError.message)
          ).then(jsonResponse => {
            playlistID =jsonResponse.id;
            return playlistID;
          });
        }).then(() => {
          return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({uris: trackURIs})
          }).then(response => {
            if(response.ok) {
              return response.json();
            }
            throw new Error('Request failed');
          }, networkError => console.log(networkError.message)
          ).then(jsonResponse => {
            playlistID =jsonResponse.id;
            return playlistID;
          });
        });
    }
  }
};

export default Spotify; */
