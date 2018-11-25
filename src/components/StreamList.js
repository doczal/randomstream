import React, { Component } from 'react';
import '../styles/StreamList.scss';

const StreamList = ({ channels }) => (
  <div className="streamListContainer">
    <ul className="streamList">
      {
        channels.map((channel) => {
          return (
            <li className="streamerCard">
              <div className="streamerInfo">
                <h2><a href={channel.url}>{channel.displayName}</a></h2>
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
)

export default StreamList;