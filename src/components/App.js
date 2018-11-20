import React, { Component } from 'react';
import Player from './Player';
import Button from './Button';
import styles from '../styles/App.module.scss';

const headers = {
  'Client-ID': '9r7t0gpprpubh826mcd7gjg763uxdm',
};
const url = 'https://api.twitch.tv/kraken/streams/';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: '',
      channels: [],
    };
  }

  componentDidMount() {
    this.getRandomChannels();
  }

  getRandomChannels = () => {
    fetch(url, {
      headers,
    })
    .then(resp => resp.json())
    .then(data => {
      let total = data._total - 100;
      console.log(total);
      let offset = Math.floor(Math.random() * Math.floor(total));
      console.log(offset);
      return fetch(url + '?limit=5&offset=' + offset, {
        headers,
      });
    })
    .then(resp => resp.json())
    .then(data => {
      const streams = data.streams;
      const channels = streams.map((stream) => {
        const { channel, game, preview, viewers } = stream;
        return {
          name: channel.name,
          displayName: channel.display_name,
          game,
          viewers,
          preview: preview.medium,
        };
      });
      this.setState({
        channel: channels[0].name,
        channels,
      });
    })
    .catch(err => {
      console.log('error:', err);
    });
  }

  render() {
    return (
      <div className={styles.app}>
        <header className={styles.appHeader}>
          random stream
        </header>
        <Player 
          channel={this.state.channel}
        />
        <Button
          onClick={this.getRandomChannels}
          centered
        >
          click
        </Button>
      </div>
      
    );
  }
}

export default App;
