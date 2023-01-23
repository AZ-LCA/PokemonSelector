import { all } from 'axios';
import React, { Component } from  'react';
import Pokemon from './Pokemon';

export default class PokemonContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            filter: all
        }
    }
    handleFilterClick(filter) {
        this.setState({
            filter: filter
        })
    }
    render() {
        let chosenPkmn = this.props.pokeList;
        if (this.state.filter === 'starred') {
            chosenPkmn = this.props.starred;
        }
        const pokemonList = chosenPkmn.map((pokemon, key) => {
            return <Pokemon key={key} url={pokemon.url} isStarred={this.props.starred.includes(pokemon)} onStar={() => this.props.onStar(pokemon)} filter={this.state.filter}/>
        })
        return(
            <div>
                <h1 className='section-head'>Pokémon Search</h1>

                <div>
                    <input type='text' value={this.props.search} onChange={this.props.handleInput} placeholder='Enter PKMN name'></input>
                </div>
                <nav className='headers'>
                    <h3 className='header' onClick={() => this.handleFilterClick('all')}>All</h3>
                    <h3 className='header' onClick={() => this.handleFilterClick('starred')}>Starred</h3>
                </nav>
                <div>
                    {pokemonList}
                    {!this.props.pokeList.length && this.props.search.length <= 1 && <p className='message'>Enter Two Characters In The Pokémon's Name</p>}
                    {!this.props.pokeList.length && this.props.search.length > 1 && <p className='message'>No Matching Pokémon</p>}
                </div>
                <div>

                </div>
            </div>
        );

    }
}