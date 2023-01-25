import React, {Component} from 'react';
import PokemonEntry from './PokemonEntry';

export default class PokemonList extends Component {
    
    render() {
        let pkmnList;
        let chosenList = this.props.mainList
        if (this.props.filter === 'starred') {
            chosenList = this.props.starredList
        }
        if (!this.props.search || chosenList === this.props.starredList) {
            pkmnList = chosenList
        } else {
            pkmnList = chosenList.filter(pokemon => pokemon.name.includes(this.props.search.toLowerCase()))
        }

        const dispPokemon = pkmnList.map((pokemon, index) => {
            return <PokemonEntry 
            key={index}
            pokemon={pokemon}
            onStarToggle={this.props.onStarToggle}
            isStarred={this.props.starredList.includes(pokemon)}/>
        })

        return(
            <div>
                <h1 className='section-head'>Search Pokémon</h1>
                <div>
                    <button onClick={() => {this.props.onFilterChange('all')}}>All</button>
                    <button onClick={() => {this.props.onFilterChange('starred')}}>Starred</button>
                    {!this.props.isCreateFakemon && <button onClick={() => {this.props.onCreateFakemonToggle()}}>Create Fakemon</button>}
                    {this.props.isCreateFakemon && <button onClick={() => {this.props.onCreateFakemonToggle()}}>Display Details</button>}
                </div>
                <input type='text' value={this.props.search} onChange={this.props.onSearchInput} placeholder='Enter Pokémon name...' />
                <button onClick={this.props.onSearchClick}>Search</button>
                {dispPokemon}
            </div>

        );
    }
}