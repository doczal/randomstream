import React, { Component } from 'react';
import '../styles/Player.scss';
import Loader from './Loader';
const Twitch = window.Twitch;
let twitchPlayer;

class Player extends Component {

  componentDidMount() {
    let options = {
      width: '100%',
      height: '100%',
      channel: '',
      autoplay: false,
    };
    twitchPlayer = new Twitch.Player("twitchEmbed", options);
  }

  componentDidUpdate(prevProps) {
    if(this.props.channel !== prevProps.channel) {
      twitchPlayer.setChannel(this.props.channel);
    }
  }

  render() {
    const { isLoading, error } = this.props;
    let display = null;
    if(error) {
      display = <div className="errorMessage">Error: {error.message}</div>;
    } else if (isLoading) {
      display = <Loader />;
    }
    return (
      <div className="playerRatioSetter">
        {display}
        <div id="twitchEmbed" className={`player ${isLoading || error ? 'hidden' : ''}`}>
        </div>
      </div>
    );
  }

  setChannel(channel) {
    twitchPlayer.setChannel(channel);
  }
  
}

export default Player;