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
    this.props.onGameSelect(e.target.dataset.name);
  }

  render() {
    const games = this.props.games;
    return(
      <div className="searchBar">
        <input
          className="searchBarInput"
          value={this.state.value}
          onChange={this.handleChange}
          onFocus={() => {this.setState({focus: true});}}
          onBlur={() => {this.setState({focus: false});}}
        />
        {
          this.state.focus ?
          <ul className="resultsList">
            {
              games.map(game => (
                <li onClick={this.handleSelect} data-name={game.name} key={game.id}>{game.name}</li>
              ))
            }
          </ul> :
          null
        }
        
      </div>
    )
  }
}

export default SearchBar;