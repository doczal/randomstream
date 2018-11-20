import React, { Component } from 'react';
const Twitch = window.Twitch;

class Temp extends Component {

  state = {
    name: '',
  }

  componentDidMount() {
    fetch('https://api.twitch.tv/kraken/streams/?limit=5', {
      headers: {
        'Client-ID': '9r7t0gpprpubh826mcd7gjg763uxdm',
      },
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
      const name = data.streams[1].channel.name;
      this.setState({
        name,
      });

      let options = {
        width: '100%',
        height: '100%',
        channel: name,
      };
  
      let player = new Twitch.Player("twitch-embed", options);
      //player.pause();

      // setTimeout(() => {
      //   player.setChannel('a_seagull');
      // }, 3000);
    });

    
  }

  render() {
    return (
      <div id="twitch-embed"></div>
    )
  }
}

export default Temp;