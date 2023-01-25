import Starred from './Starred';

function PokemonEntry(props) {
    return(
        <div className='dex-entry'>
            <img className='pokemon-sprite' src={props.pokemon.sprites.front_default} alt='NO SPRITE AVAILABLE' />
            <div className='pokemon-details'>
                <h4>{props.pokemon.name.charAt(0).toUpperCase()+props.pokemon.name.slice(1)}</h4>
                <h4>Dex Number: {props.pokemon.id}</h4>
            </div>
            <div>
                <Starred isStarred={props.isStarred} pokemon={props.pokemon} onStarToggle={props.onStarToggle}/>
            </div>
        </div>
    );
}

export default PokemonEntry;