import React, { Component } from 'react';
import Player from './Player';
import Button from './Button';
import SearchBar from './SearchBar';
import StreamList from './StreamList';
import '../styles/App.scss';

const headers = {
  'Client-ID': '9r7t0gpprpubh826mcd7gjg763uxdm',
};
const streamsUrl = 'https://api.twitch.tv/kraken/streams/';
const gamesUrl = 'https://api.twitch.tv/kraken/search/games/?type=suggest';
let timer;
let playerContainer;
let sidePanel;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: '',
      games: [],
      channel: '',
      channels: [],
      status: ''
    };
  }

  componentDidMount() {
    this.getRandomChannel();
    window.addEventListener("resize", this.updateSidePanelHeight);
    playerContainer = document.querySelector(".playerContainer");
    sidePanel = document.querySelector(".sidePanel");
    this.updateSidePanelHeight();
  }

  updateSidePanelHeight = () => {
    //sidePanel.style.maxHeight = playerContainer.offsetHeight + "px";
  }

  onSearchChange = (title) => {
    if(timer) {
      clearTimeout(timer);
    }
    if(title.length > 2) { 
      timer = setTimeout(
        () => { this.searchGames(title) },
        500
      );
    } else {
      this.setState({
        games: [],
      });
    }
  }

  onGameSelect = (game) => {
    this.setState({
      game,
    });
  }

  searchGames = (title) => {
    fetch(gamesUrl + '&query=' + title, {
      headers,
    })
    .then(resp => resp.json())
    .then(data => {
      const games = data.games.map((game) => {
        const { name, _id } = game;
        return {
          name,
          id: _id,
        };
      });
      console.log(games);
      this.setState({
        games,
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  getRandomChannel = () => {
    fetch(streamsUrl + '?game=' + this.state.game, {
      headers,
    })
    .then(resp => resp.json())
    .then(data => {
      //gotta check if total is 0
      let total = data._total;// - 100;
      console.log(total);
      let offset = Math.floor(Math.random() * Math.floor(total));
      console.log(offset);
      return fetch(streamsUrl + '?limit=1&offset=' + offset + '&game=' + this.state.game, {
        headers,
      });
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
      const streams = data.streams;
      const channels = streams.map((stream) => {
        const { channel, game, viewers, _id } = stream;
        return {
          name: channel.name,
          displayName: channel.display_name,
          id: _id,
          game,
          url: channel.url,
          viewers,
        };
      });
      this.setState({
        channel: channels[0].name,
        channels: [channels[0], ...this.state.channels],
      });
    })
    .catch(err => {
      console.log('error:', err);
    });
  }

  getChannelByUser = (e, name) => {
    e.preventDefault();
    fetch(streamsUrl + '?game=' + this.state.game, {
      headers,
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
      const streams = data.streams;
      const channels = streams.map((stream) => {
        const { channel, game, viewers, _id } = stream;
        return {
          name: channel.name,
          displayName: channel.display_name,
          id: _id,
          game,
          url: channel.url,
          viewers,
        };
      });
      this.setState({
        channel: channels[0].name,
        channels: [channels[0], ...this.state.channels],
      });
    })
    .catch(err => {
      console.log('error:', err);
    });
  }

  render() {
    return (
      <div className="app">
        <header className="appHeader">
          <h1 className="appHeaderTitle"><span>random</span>stream</h1>
        </header>
        <div className="mainContainer">
          <div className="playerContainer">
            <Player 
              channel={this.state.channel}
            />
          </div>
          <div className="sidePanel">
            <SearchBar
              games={this.state.games}
              onGameSelect={this.onGameSelect}
              onSearchChange={this.onSearchChange}
            />
            
            <Button
              onClick={this.getRandomChannel}
              centered
              fullWidth
            >
              Bring Me Another
            </Button>

            <StreamList 
              channels={this.state.channels}
            />
          </div>
        </div>
      </div>
      
    );
  }
}

export default App;
