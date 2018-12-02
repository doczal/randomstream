import React, { Component } from 'react';
import Player from './Player';
import Button from './Button';
import SearchBar from './SearchBar';
import StreamList from './StreamList';
import '../styles/App.scss';

const headers = {
  'Accept': 'application/vnd.twitchtv.v5+json',
  'Client-ID': '9r7t0gpprpubh826mcd7gjg763uxdm',
};
const streamsUrl = 'https://api.twitch.tv/kraken/streams/';
const gamesUrl = 'https://api.twitch.tv/kraken/search/games/?type=suggest';
let timer;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: '',
      games: [],
      channel: '',
      channels: [],
      isLoading: true,
      error: null,
      streamsWatched: 0,
    };
  }

  componentDidMount() {
    this.getRandomChannel();
    window.addEventListener("resize", this.updateSidePanelHeight);
    if(localStorage.getItem('streamsWatched')) {
      this.setState({
        streamsWatched: parseInt(localStorage.getItem('streamsWatched'), 10),
      });
    }
    if(localStorage.getItem('channels')) {
      this.setState({
        channels: JSON.parse(localStorage.getItem('channels')),
      });
    }
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
      if(title.length === 0) { 
        this.setState({
          game: '',
        });
      }
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
      this.setState({
        games: [],
      });
      console.log(err);
    });
  }

  getRandomChannel = () => {
    this.setState({
      error: null,
      isLoading: true,
    });
    fetch(streamsUrl + '?game=' + this.state.game, {
      headers,
    })
    .then(resp => resp.json())
    .then(data => {
      let total = data._total;
      if(total === 0) {
        throw new Error('No streams found.');
      }
      let offset = Math.floor(Math.random() * Math.floor(total));
      //console.log(offset);
      return fetch(streamsUrl + '?limit=1&offset=' + offset + '&game=' + this.state.game, {
        headers,
      });
    })
    .then(resp => resp.json())
    .then(data => {
      //console.log(data);
      const streams = data.streams;
      const channels = streams.map((stream) => {
        const { channel, game, viewers } = stream;
        return {
          name: channel.name,
          displayName: channel.display_name,
          id: channel._id,
          game,
          url: channel.url,
          viewers,
        };
      });
      this.setState((prevState) => ({
        channel: channels[0].name,
        channels: [channels[0], ...this.state.channels],
        isLoading: false,
        streamsWatched: prevState.streamsWatched + 1,
      }), () => {
        localStorage.setItem('streamsWatched', this.state.streamsWatched);
        localStorage.setItem('channels', JSON.stringify(this.state.channels));
      });
    })
    .catch(err => {
      this.setState({
        error: err,
      });
    });
  }

  getChannelByID = (id) => {
    this.setState({
      error: null,
      isLoading: true,
    });
    fetch(streamsUrl + id, {
      headers,
    })
    .then(resp => resp.json())
    .then(data => {
      //console.log(data.stream);
      if(data.stream === undefined) {
        throw new Error('Channel does not exist.');
      } else if(data.stream === null) {
        throw new Error('Channel is offline.');
      }
      const stream = data.stream;
      const { channel, game, viewers } = stream;
      const newChannel = {
        name: channel.name,
        displayName: channel.display_name,
        id: channel._id,
        game,
        url: channel.url,
        viewers,
      };
      this.setState({
        channel: newChannel.name,
        channels: [
          newChannel, 
          ...this.state.channels.filter((c) => c.id !== newChannel.id)
        ],
        isLoading: false,
      }, () => {
        localStorage.setItem('channels', JSON.stringify(this.state.channels));
      });
    })
    .catch(err => {
      this.setState({
        error: err,
      });
      console.log('error:', err);
    });
  }

  render() {
    const { streamsWatched, game } = this.state;
    return (
      <div className="app">
        <header className="appHeader">
          <h1 className="appHeaderTitle"><span>random</span>stream</h1>
        </header>
        <h2 className="categoryTitle">{`Current Category:`} <span>{`${ game === '' ? 'All' : game}`}</span></h2>
        <div className="mainContainer">
          <div className="playerContainer">
            <Player
              isLoading={this.state.isLoading}  
              channel={this.state.channel}
              error={this.state.error}
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
              Next Stream
            </Button>
            <h3 className="streamsWatched"><span>{`${streamsWatched}`}</span>{` stream${streamsWatched > 1 || streamsWatched === 0 ? 's' : ''} watched`}</h3>
            <StreamList 
              channels={this.state.channels}
              getChannelByID={this.getChannelByID}
            />
          </div>
        </div>
      </div>
      
    );
  }
}

export default App;
