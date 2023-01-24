import React, {Component} from 'react';

export default class Starred extends Component {
    constructor(props) {
        super(props)
    }
    handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.props.onStar();
    }
    render() {
        let starred = false;
        const isStarred = this.props.isStarred.forEach(pokemon => {
            if (pokemon.name === this.props.name) {
                starred = true;
            }
        })
        return(
            <>
                {!starred && <div className='star-pokemon' onClick={this.handleClick}><p className='star'>Star</p></div>}
                {starred && <div className='star-pokemon' onClick={this.handleClick}><p className='star'>Unstar</p></div>}
            </>
        );
    }
}