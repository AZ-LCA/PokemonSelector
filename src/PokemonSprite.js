import React from 'react';

function PokemonSprite(props) {
    return(
        <>
            <img className='pokemon-sprite' src={props.sprites.front_default}/>
            {!props.sprites.front_default && <p className='pokemon-sprite sprite-unavailable'>No Sprite Available</p>}
        </>

    );
}

export default PokemonSprite;