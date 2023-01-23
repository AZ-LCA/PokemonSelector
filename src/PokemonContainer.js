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
            return <Pokemon key={key} url={pokemon.url}/>
        })
        return(
            <div>
                <div>
                    <input type='text' value={this.props.search} onChange={this.props.handleInput} placeholder='Enter PKMN name'></input>
                </div>
                <div>
                    {pokemonList}
                    {!this.props.pokeList.length && this.props.search.length <= 2 && <p>Enter Three Characters In The Pokémon's Name</p>}
                    {!this.props.pokeList.length && this.props.search.length > 2 && <p>No Matching Pokémon</p>}
                </div>
                <div>

                </div>
            </div>
        );

    }
}