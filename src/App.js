import React, {Component} from 'react';
import PokemonList from './PokemonList';
import axios from 'axios';
import CreateFakemon from './CreateFakemon';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state={
      filter: 'all',
      mainList: [],
      allUrls: [],
      starredList: [],
      userInput: '',
      chosenPokemon: {},
      createFakemon: false,
      fakemonName: '',
      fakemonMoves: ['','','',''],
      fakemonAbility: ''
    }
  }
  handleEditFakemonName = (e) => {
    this.setState({
      fakemonName: e.target.value
    })
  }
  handleDeleteClick = (fakemon) => {
    const index = this.state.starredList.indexOf(fakemon);
    const starredList = this.state.starredList.slice();
    starredList.splice(index, 1);
    this.setState({
      starredList: starredList
    })
  }
  handleEditClick = (fakemon) => {
    const newName = window.prompt("Enter a new Fakemon Name: ");
    const index = this.state.starredList.indexOf(fakemon);
    const starredList = this.state.starredList.slice();
    starredList[index].name = newName;
    this.setState({
      starredList: starredList
    })
  }
  handleNewFakemon = (e) => {
    e.preventDefault()
    const name = this.state.fakemonName;
    this.setState(prevState => {
      return {
        starredList: [...prevState.starredList,{name: name}],
        fakemonName: ''
      }
    })
  }
  handleCreateFakemonToggle = () => {
    this.setState(prevState => {
      return {
        createFakemon: !prevState.createFakemon
      }
    });
  }
  handleFilterChange = (filter) => {
    this.setState({
      filter: filter
    })
  }
  handleStarToggle = (pokemon) => {
    const starredList = this.state.starredList.slice();
    const pkmnIndex = starredList.indexOf(pokemon);
    if (parseFloat(pkmnIndex) === -1) {
      starredList.push(pokemon);
    } else {
      starredList.splice(pkmnIndex, 1);
    }
    this.setState({
      starredList: starredList
    })
  }
  handleSearchInput = (e) => {
    const input = e.target.value;
    this.setState({
      search: input
    })
  }
  handleSearchClick = (e) => {
    e.preventDefault();
    console.log(this.state.mainList.length)
    
  }
  componentDidMount() {
    const apiURL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=1008';
    axios.get(apiURL).then(response => response.data)
    .then(result => {
      return result.results
    }).then(results => {
      const urls = results.map(result => {
        return result.url
      })
      return urls
    }).then(urls => {
      this.setState({
        allUrls: urls
      })
      return urls;
    }).then(urls => Promise.all(urls.map((url) => {axios.get(url).then(response => {
      const item = response.data;
      this.setState(prevState => {
        return{
          mainList: [...prevState.mainList, item]
        }
      })
    })}))
    ).catch(err => {
      console.log(err)
    })

  }
  render() {
    return (
      <>
      <div className='pokemon-selector-app'>
        <div className='pokemon-list'>
          <PokemonList 
          onDeleteFakemon = {this.handleDeleteClick}
          onEditFakemon = {this.handleEditClick}
          isCreateFakemon = {this.state.createFakemon}
          onCreateFakemonToggle = {this.handleCreateFakemonToggle}
          onStarToggle = {this.handleStarToggle} 
          filter = {this.state.filter}
          onFilterChange = {this.handleFilterChange}
          starredList = {this.state.starredList} 
          mainList = {this.state.mainList} 
          search = {this.state.search} 
          onSearchInput = {this.handleSearchInput} 
          onSearchClick = {this.handleSearchClick}/>
        </div>
        <div className='pokemon-details'>
          {this.state.createFakemon && <CreateFakemon 
          onEditFakemonName = {this.handleEditFakemonName}
          onNewFakemon = {this.handleNewFakemon}
          fakemonName={this.state.fakemonName} 
          fakemonMoves={this.state.fakemonMoves} 
          fakemonAbility={this.state.fakemonAbility}/>}
          {!this.state.createFakemon && <h1>Pokémon Details</h1>}
        </div>
      </div>
      </>
    );
  }
}
