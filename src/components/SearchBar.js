import React, { Component } from 'react';
import '../styles/SearchBar.scss';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focus: false,
      value: '',
    };
  }

  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({
      value: e.target.value
    });
    this.props.onSearchChange(e.target.value);
  }

  handleSelect = (e) => {
    const game = e.target.dataset.name;
    this.setState({
      value: game
    });
    this.props.onGameSelect(game);
  }

  render() {
    const games = this.props.games;
    const focus = this.state.focus;
    return(
      <div className="searchBar">
        <input
          placeholder="Game or Category..."
          className="searchBarInput"
          value={this.state.value}
          onChange={this.handleChange}
          onFocus={() => {this.setState({focus: true});}}
          onBlur={() => {this.setState({focus: false});}}
        />
        <ul className={[
          "resultsList",
          focus ? "" : "hidden",
        ].join(" ")} >
          {
            games.map(game => (
              <li onMouseDown={this.handleSelect} data-name={game.name} key={game.id}>{game.name}</li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default SearchBar;