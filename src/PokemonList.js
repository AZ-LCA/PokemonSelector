import React, {Component} from 'react';
import PokemonEntry from './PokemonEntry';

function PokemonList(props) {
    //Gets the mainList or starredList depending on the filter
    let pkmnList;
    let chosenList = props.mainList
    if (props.filter === 'starred') {
        chosenList = props.starredList
    }
    if (!props.search || chosenList === props.starredList) {
        pkmnList = chosenList
    } else {
        pkmnList = chosenList.filter(pokemon => pokemon.name.includes(props.search.toLowerCase()))
    }
    //Sets up each PokemonEntry
    const dispPokemon = pkmnList.map((pokemon, index) => {
        return <PokemonEntry 
        onDetailsClick = {props.onDetailsClick}
        onDeleteFakemon = {props.onDeleteFakemon}
        onEditFakemon = {props.onEditFakemon}
        key={index}
        pokemon={pokemon}
        onStarToggle={props.onStarToggle}
        isStarred={props.starredList.includes(pokemon)}/>
    })
    return(
        <div>
            <h1 className='section-head'>Search Pokémon</h1>
            <div>
                <button onClick={() => {props.onFilterChange('all')}}>All Pokémon</button>
                <button onClick={() => {props.onFilterChange('starred')}}>Starred Pokémon And Fakemon</button>
                {!props.isCreateFakemon && <button onClick={() => {props.onCreateFakemonToggle()}}>Create Fakemon</button>}
                {props.isCreateFakemon && <button onClick={() => {props.onCreateFakemonToggle()}}>Display Details</button>}
            </div>
            <input type='text' value={props.search} onChange={props.onSearchInput} placeholder='Enter Pokémon name...' />
            {dispPokemon}
        </div>

    );
}

export default PokemonList;