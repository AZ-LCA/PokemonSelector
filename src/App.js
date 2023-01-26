import React, {Component} from 'react';
import PokemonList from './PokemonList';
import axios from 'axios';
import CreateFakemon from './CreateFakemon';
import PokemonDetails from './PokemonDetails';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state={
      search: '',
      filter: 'all',
      mainList: [],
      allUrls: [],
      starredList: [],
      userInput: '',
      chosenPokemon: {},
      createFakemon: false,
      showDetails: false,
      fakemonName: '',
      fakemonMoves: ['','','',''],
      fakemonAbility: '',
      clearList: []
    }
  }
  //This handles when the user clicks the details button located in PokemonEntry
  handleDetailsClick = (pokemon) => {
    this.setState(prevState => {
      return {
        chosenPokemon: pokemon,
        showDetails: !prevState.showDetails
      }

    })
  }
  //This handles when the user types in the fakemon's name when creating it
  handleEditFakemonName = (e) => {
    this.setState({
      fakemonName: e.target.value
    })
  }
  //This handles when the user clicks the delete button in PokemonEntry (Only for fakemon)
  handleDeleteClick = (fakemon) => {
    const index = this.state.starredList.indexOf(fakemon);
    const starredList = this.state.starredList.slice();
    starredList.splice(index, 1);
    this.setState({
      starredList: starredList
    })
  }
  //This handles when the user clicks the edit button in PokemonEntry (Only for fakemon)
  handleEditClick = (fakemon) => {
    const newName = window.prompt("Enter a new Fakemon Name: ");
    const index = this.state.starredList.indexOf(fakemon);
    const starredList = this.state.starredList.slice();
    starredList[index].name = newName;
    this.setState({
      starredList: starredList
    })
  }
  //This handles when the user clicks the create fakemon button in CreateFakemon
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
  //This toggles the create fakemon page
  handleCreateFakemonToggle = () => {
    this.setState(prevState => {
      return {
        createFakemon: !prevState.createFakemon
      }
    });
  }
  //This changes the filter, which affects whether the mainList or starredList is displayed
  handleFilterChange = (filter) => {
    this.setState({
      filter: filter
    })
  }
  //This handles toggling whether a pokémon is starred or not when the star button is clicked in PokemonEntry
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
  //This adds an item to the clear list
  handleSelectClearToggle = (pokemon) => {
    console.log(this.state.clearList.slice())
    const clearList = this.state.clearList.slice();
    const pkmnIndex = clearList.indexOf(pokemon);
    if (parseFloat(pkmnIndex) === -1) {
      clearList.push(pokemon);
    } else {
      clearList.splice(pkmnIndex, 1);
    }
    this.setState({
      clearList: clearList
    })
  }
  //This runs handleStarToggle for each selected item
  handleClearSelected = (e) => {
    e.preventDefault();
    this.state.clearList.forEach(pokemon => {
      this.handleStarToggle(pokemon);
    });
    this.setState({
      clearList: []
    })
  }
  //This handles the user input when filtering the mainList
  handleSearchInput = (e) => {
    const input = e.target.value;
    this.setState({
      search: input
    })
  }
  //Handles when clear button is made
  handleClearClick = (e) => {
    e.preventDefault()
    this.setState({
      starredList: []
    })
  }
  //This calls when the component has mounted
  //Called twice when using React.StrictMode so I got rid of it, which fixed my code
  componentDidMount() {
    const apiURL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=1279';
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
    })}))).then(() => {this.setState(prevState => {
      return {
        mainList: prevState.mainList.sort((a, b) => (a.id < b.id) ? 1 : -1)
      }
    })}).catch(err => {
      console.log(err)
    })
  }
  //Renders all of my components
  render() {
    return (
      <>
      <div className='pokemon-selector-app'>
        <div className='pokemon-list'>
          <PokemonList 
          clearList = {this.state.clearList}
          onClearSelected= {this.handleClearSelected}
          onSelectPokemonClear= {this.handleSelectClearToggle}
          onClearClick= {this.handleClearClick}
          onDetailsClick = {this.handleDetailsClick}
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
          onSearchInput = {this.handleSearchInput}/>
        </div>
        <div className='pokemon-details'>
          {!this.state.createFakemon && <PokemonDetails pokemon={this.state.chosenPokemon}/>}
          {this.state.createFakemon && <CreateFakemon 
          onEditFakemonName = {this.handleEditFakemonName}
          onNewFakemon = {this.handleNewFakemon}
          fakemonName={this.state.fakemonName} 
          fakemonMoves={this.state.fakemonMoves} 
          fakemonAbility={this.state.fakemonAbility}/>}
        </div>
      </div>
      </>
    );
  }
}
