import React, {Component} from 'react';
import axios from 'axios';
import PokemonContainer from './PokemonContainer';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      pokeList: [],
      starred: []
    }
  }
  handleStarToggle = (pkmn) => {
    const starred = this.state.starred.slice();
    const pkmnInd = starred.indexOf(pkmn);
    if (parseFloat(pkmnInd) === -1) {
      starred.push(pkmn);
    } else {
      starred.splice(pkmnInd, 1);
    }
    this.setState({
      starred: starred
    });
  }
  handleInput = (e) => {
    const apiURL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=1279'
    const input = e.target.value;
    axios.get(apiURL).then(response => {
      return response.data
    }).then(result => {
      this.setState({
        search: input
      })
      return result;
    }).then(result => {
      if (input.length > 1) {
        const filteredMons = result.results.filter((pkmn) => {
          return pkmn.name.toLowerCase().includes(input.toLowerCase());
        })
        this.setState({
          pokeList: filteredMons
        })
      } else {
        this.setState({
          pokeList: []
        })
      }
    })

    

  }
  render() {
    return(
      <>
      <div className='pokemon-selector-app'>
        <div className='pokemon-list'>
          <PokemonContainer starred={this.state.starred} onStar={this.handleStarToggle} search={this.state.search} handleInput={this.handleInput} pokeList={this.state.pokeList}/>
        </div>
        <div className='pokemon-select'>
          <h1> Starred Pokémon</h1>
        </div>
      </div>

      </>
    );
  }
}
