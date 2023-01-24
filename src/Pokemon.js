import { render } from '@testing-library/react';
import axios from 'axios';
import React, { Component } from 'react';
import PokemonSprite from './PokemonSprite';
import Starred from './Starred';

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
            this.setState({
                name: result.name,
                id: result.id,
                sprites: result.sprites
            })
        })
        return(
            <div >
                {this.state.name && <div className='dex-display'>
                    <PokemonSprite sprites={this.state.sprites}/>
                    <div className='pokemon-details'>
                        <h4>ID: {this.state.id}</h4>
                        <h5>{this.state.name}</h5>
                    </div>
                    <Starred isStarred={this.props.isStarred} name={this.state.name} onStar={this.props.onStar} />
                </div>}
            </div>



            );
    }
}

export default Pokemon;