import axios from 'axios';
import React, {Component} from 'react';
import InfoContainer from './InfoContainer';

function PokemonDetails(props) {
    return(
        <>
            {props.pokemon.length>0 && <div className='details-display'>
                <h1 className='details-text'>{props.name}</h1>
                <h1 className='details-text'>Dex Number: {props.id}</h1>
                <img className='details-img' src={props.sprite} alt={'No Sprite Available'}/>
                <img className='details-img' src={props.shiny_sprite} alt={'No Sprite Available'}/>
                <InfoContainer name={'Moves'} info={props.moves}/>
                <InfoContainer name={'Abilities'} info={props.abilities}/>
                {props.tier && <p className='details-tier'>{props.tier}-Tier</p>}
            </div>}
            
            {props.starred.includes(props.currentPkmn) && props.pokemon.length>0 && <form onSubmit={(e) => props.onTierSubmit(e)} action="submit">
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

export default PokemonDetails;