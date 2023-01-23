import { render } from '@testing-library/react';
import axios from 'axios';
import React, { Component } from 'react';
import PokemonSprite from './PokemonSprite';

class Pokemon extends Component {
    constructor(props) {
        super(props)

        this.state ={
            name: '',
            id: '',
            sprites: '',
            height: '',
            weight: ''
        }
    }
    render() {
        const apiURL = this.props.url;
        axios.get(apiURL).then(response => {
            return response.data
        }).then(result => {
            this.setState({
                name: result.name,
                id: result.id,
                sprites: result.sprites
            })
        })
        return(
            <div className='dex-display'>
                {this.state.name && <div>
                    <PokemonSprite sprites={this.state.sprites}/>
                    <h4>{this.state.name}</h4>
                    <h6>Registration Number: {this.state.id}</h6>
                </div>}
            </div>



            );
    }
}

export default Pokemon;