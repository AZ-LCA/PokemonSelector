import React, { Component } from  'react';
import Pokemon from './Pokemon';

export default class PokemonContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    render() {
        const pokemonList = this.props.pokeList.map((pokemon, key) => {
            return <Pokemon key={key} url={pokemon.url} isStarred={this.props.starred.includes(pokemon)} onStar={() => this.props.onStar(pokemon)}/>
        })
        return(
            <div>
                <h1 className='section-head'>Pokémon Search</h1>
                <nav>
                    <h3 className='header'>Search</h3>
                    <h3 className='header'>Starred</h3>
                </nav>
                <div>
                    <input type='text' value={this.props.search} onChange={this.props.handleInput} placeholder='Enter PKMN name'></input>
                </div>
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