import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    this.props.onGameSelect(e.target.dataset.name);
  }

  render() {
    const games = this.props.games;
    return(
      <div>
        <input
          value={this.state.value}
          onChange={this.handleChange}
        />
        <ul>
          {
            games.map(game => (
              <li onClick={this.handleSelect} data-name={game.name} key={game.id}>{game.name}</li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default SearchBar;