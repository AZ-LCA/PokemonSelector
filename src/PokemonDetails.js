import InfoContainer from './InfoContainer';

function PokemonDetails(props) {
    let moves;
    let abilities;
    console.log(props.pokemon)
    if (props.pokemon.id) {
        console.log(props.pokemon.moves)
        moves = props.pokemon.moves.map(move => {
            return move.move.name
        })
        abilities = props.pokemon.abilities.map(ability => {
            return ability.ability.name
        })
    }
        return(
            <>
                {props.pokemon.name && 
                <>
                <h1>Pokémon Details</h1>
                <div className='details-display'>
                    <h1 className='details-text'>{props.pokemon.name.charAt(0).toUpperCase() + props.pokemon.name.slice(1)}</h1>
                    {props.pokemon.id && <>
                    <h1 className='details-text'>Dex Number: {props.pokemon.id}</h1>
                    <img className='details-img' src={props.pokemon.sprites.front_default} alt={'No Sprite Available'}/>
                    <img className='details-img' src={props.pokemon.sprites.front_shiny} alt={'No Sprite Available'}/>
                    <InfoContainer name={'Moves'} info={moves}/>
                    <InfoContainer name={'Abilities'} info={abilities}/>
                    </>}
                </div>
                </>}
            </>

            );
}

export default PokemonDetails;