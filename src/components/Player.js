import React, { Component } from 'react';
import styles from '../styles/Player.module.scss';
const Twitch = window.Twitch;
let twitchPlayer;

class Player extends Component {

  componentDidMount() {
    let options = {
      width: '100%',
      height: '100%',
      channel: 'moonmoon_ow',
    };
    twitchPlayer = new Twitch.Player("twitchEmbed", options);
  }

  componentDidUpdate(prevProps) {
    if(this.props.channel !== prevProps.channel) {
      twitchPlayer.setChannel(this.props.channel);
    }
  }

  render() {
    return (
      <div className={styles.playerContainer}>
        <div className={styles.playerRatioSetter}>
          <div id="twitchEmbed" className={styles.player}>
          </div>
        </div>
      </div>
    );
  }

  setChannel(channel) {
    twitchPlayer.setChannel(channel);
  }
  
}

export default Player;