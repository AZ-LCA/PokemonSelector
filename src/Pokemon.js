import { render } from '@testing-library/react';
import axios from 'axios';
import React, { Component } from 'react';
import PokemonSprite from './PokemonSprite';
import Starred from './Starred';
import DetailsButton from './DetailsButton';

class Pokemon extends Component {
    constructor(props) {
        super(props)

        this.state ={
            name: '',
            id: '',
            sprites: ''
        }
    }
    render() {
        const apiURL = this.props.url;
        axios.get(apiURL).then(response => {
            return response.data
        }).then(result => {
            const name = result.name[0].toUpperCase() + result.name.slice(1);
            this.setState({
                name: name,
                id: result.id,
                sprites: result.sprites
            })
        })
        let starred = false;
        const isStarred = this.props.isStarred.forEach(pokemon => {
            if (pokemon.name === this.state.name.toLowerCase()) {
                starred = true;
            }
        })
        return(
            <div >
                {this.state.name && <div className='dex-display'>
                    <PokemonSprite sprites={this.state.sprites}/>
                    <div className='pokemon-details'>
                        <h4>ID: {this.state.id}</h4>
                        <h5>{this.state.name}</h5>
                    </div>
                    <DetailsButton onDetailsClick={this.props.onDetailsClick}/>
                    <Starred isStarred={starred} onStar={this.props.onStar} />
                </div>}
            </div>



            );
    }
}

export default Pokemon;