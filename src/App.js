import React, {Component} from 'react';
import axios from 'axios';
import PokemonContainer from './PokemonContainer';
import PokemonDetails from './PokemonDetails';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      pokeList: [],
      starred: [],
      details: {},
      current: ''      
    }
  }
  handleStarToggle = (pkmn) => {
    const starred = this.state.starred.slice();
    const boolPkmnList = starred.map(pokemon => {
      if(pkmn.name === pokemon.name) {
        return true;
      } else {
        return false;
      }
    })
    const pkmnInd = boolPkmnList.indexOf(true);
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
  handleDetailsClick = (pkmn) => {
    this.setState({
      details: pkmn.url,
      current: pkmn.name
    })
  }
  handleTierPick = (e) => {
    e.preventDefault();
    const name = this.state.current;
    let indexOfPkmn = -1;
    this.state.pokeList.forEach((pkmn, index) => {

      if (pkmn.name === name) {
        indexOfPkmn = index;
      }
    })
    const tierValue = e.target[0].value
    const withTier = this.state.pokeList.slice();
    withTier[indexOfPkmn].tier = tierValue;
    console.log(withTier)
    this.setState({
      starred: withTier
    });

  }
  render() {
    return(
      <>
      <div className='pokemon-selector-app'>
        <div className='pokemon-list'>
          <PokemonContainer onDetailsClick={this.handleDetailsClick} starred={this.state.starred} onStar={this.handleStarToggle} search={this.state.search} handleInput={this.handleInput} pokeList={this.state.pokeList}/>
        </div>
        <div className='pokemon-select'>
          <h1>Pokémon Details</h1>
          <PokemonDetails onTierSubmit={this.handleTierPick} pokemon={this.state.details}/>
        </div>
      </div>

      </>
    );
  }
}
