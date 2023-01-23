import React from 'react';

function PokemonSprite(props) {
    return(
        <>
            <img src={props.sprites.front_default}/>
            {!props.sprites.front_default && <p>No Sprite Available</p>}
        </>

    );
}

export default PokemonSprite;