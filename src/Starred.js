import React from 'react';

function Starred(props) {
        return(
            <>
                {!props.isStarred && <button className='star-button' onClick={() => props.onStarToggle(props.pokemon)}>Star</button>}
                {props.isStarred && <button className='star-button' onClick={() => props.onStarToggle(props.pokemon)}>Unstar</button>}
            </>
        );
}

export default Starred;