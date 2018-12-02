import React, { Component } from 'react';
import '../styles/StreamList.scss';

class StreamList extends Component {

  handleClick = (e, id) => {
    e.preventDefault();
    this.props.getChannelByID(id);
  }

  render() {
    const { channels, streamsWatched } = this.props;
    return (
      <div className="streamListContainer">
        <ul className="streamList">
          {
            channels.map((channel) => {
              return (
                <li key={channel.id} className="streamerCard">
                  <div className="streamerInfo">
                    <h2><a onClick={(e) => {this.handleClick(e, channel.id)}} href={channel.url}>{channel.displayName}</a></h2>
                    <span>{ channel.game.length > 0 ? channel.game : 'Unknown' }</span>
                  </div>
                  <div className="streamInfo">
                    {channel.viewers} viewers
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default StreamList;