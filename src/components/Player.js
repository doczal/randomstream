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
    const { isLoading } = this.props;
    return (
      <div className="playerRatioSetter">
        {
          isLoading ?
          <Loader /> :
          null
        }
        <div id="twitchEmbed" className={`player ${isLoading ? 'hidden' : ''}`}>
        </div>
      </div>
    );
  }

  setChannel(channel) {
    twitchPlayer.setChannel(channel);
  }
  
}

export default Player;