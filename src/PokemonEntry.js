import Starred from './Starred';

function PokemonEntry(props) {
    return(
        <div className='dex-entry'>
            {props.pokemon.id && <img className='pokemon-sprite' src={props.pokemon.sprites.front_default} alt='NO SPRITE AVAILABLE' />}
            <div className='pokemon-details'>
                <h4>{props.pokemon.name.charAt(0).toUpperCase()+props.pokemon.name.slice(1)}</h4>
                {props.pokemon.id && <h4>Dex Number: {props.pokemon.id}</h4>}
            </div>
            <div>
                {props.pokemon.id && <Starred isStarred={props.isStarred} pokemon={props.pokemon} onStarToggle={props.onStarToggle}/>}
                <button onClick={() => {props.onDetailsClick(props.pokemon)}}>Details</button>
                {!props.pokemon.id && <button onClick={() => {props.onEditFakemon(props.pokemon)}}>Edit</button>}
                {!props.pokemon.id && <button onClick={() => props.onDeleteFakemon(props.pokemon)}>Delete</button>}
            </div>
        </div>
    );
}

export default PokemonEntry;