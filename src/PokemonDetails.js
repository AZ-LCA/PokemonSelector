import axios from 'axios';
import React, {Component} from 'react';
import InfoContainer from './InfoContainer';

export default class PokemonDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sprite: '',
            shiny_sprite: '',
            name: '',
            id: '',
            moves: [],
            abilities: []

        }
    }
    render() {
        const apiURL = this.props.pokemon
        if (apiURL.length>0) {
            axios.get(apiURL).then(response => {
                return response.data
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
            })
        }

        return(
        <>
            {apiURL.length>0 && <div className='details-display'>
                <h1 className='details-text'>{this.state.name}</h1>
                <h1 className='details-text'>Dex Number: {this.state.id}</h1>
                <img className='details-img' src={this.state.sprite} alt={'No Sprite Available'}/>
                <img className='details-img' src={this.state.shiny_sprite} alt={'No Sprite Available'}/>
                <InfoContainer name={'Moves'} info={this.state.moves}/>
                <InfoContainer name={'Abilities'} info={this.state.abilities}/>
                {}
            </div>}
            {apiURL.length>0 && <form onSubmit={(e) => this.props.onTierSubmit(e)} action="submit">
      <label className='tier' htmlFor="tier">Tier:</label>{' '}
      <select name="languages" className="tier">
        <option value="S">S</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
      </select>{' '}
      <input className='button' type="submit" value="Submit" />
</form>}
        </>

        );
    }
}