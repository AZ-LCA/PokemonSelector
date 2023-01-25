import React, {Component} from 'react';
import axios from 'axios';
import PokemonContainer from './PokemonContainer';
import PokemonDetails from './PokemonDetails';
import InfoContainer from './InfoContainer';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      pokeList: [],
      starred: [],
      details: {},
      currentName: '',
      currentTier: '' ,
      pokemon:{},
      abilities: [],
      moves: [],
      name: '',
      id: '',
      sprite: '',
      shiny_sprite: ''
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
      currentName: pkmn.name,
      pokemon: pkmn,
      currentTier: pkmn.tier
    })
    const apiURL = pkmn.url
        console.log(apiURL)
        if (apiURL.length>0) {
            axios.get(apiURL).then(response => {
                return response.data
                console.log(response.data);
            }).then(results => {
                const abilities = results.abilities.map(ability => {
                    return ability.ability.name;
                })
                abilities.sort();
                const moves = results.moves.map(move => {
                    return move.move.name;
                })
                moves.sort();
                const name = results.name[0].toUpperCase() + results.name.slice(1);
                this.setState({
                    abilities: abilities,
                    moves: moves,
                    id: results.id,
                    name: name,
                    sprite: results.sprites.front_default,
                    shiny_sprite: results.sprites.front_shiny
                })
                console.log(this.state.abilities)
            })
        }
  }
  handleTierPick = (e) => {
    e.preventDefault();
    const name = this.state.currentName;
    const tierValue = e.target[0].value
    let indexOfStrPkmn = -1;
    this.state.starred.forEach((pkmn, index) => {

      if (pkmn.name === name) {
        indexOfStrPkmn = index;
      }
    })

    const withStarTier = this.state.starred.slice();
    withStarTier[indexOfStrPkmn].tier = tierValue;
    this.setState({
      starred: withStarTier,
      currentTier: withStarTier[indexOfStrPkmn].tier
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
          <PokemonDetails tier={this.state.currentTier} starred={this.state.starred} currentPkmn={this.state.pokemon} onTierSubmit={this.handleTierPick} pokeList={this.state.pokeList} comparison={this.state.pokemon} pokemon={this.state.details} abilities={this.state.abilities} moves={this.state.moves} id={this.state.id} name={this.state.name} sprite={this.state.sprite} shiny_sprite={this.state.shiny_sprite}/>
        </div>
      </div>

      </>
    );
  }
}
