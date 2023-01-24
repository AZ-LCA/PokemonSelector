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

        return(
            <>
                {!this.props.isStarred && <div className='star-pokemon' onClick={this.handleClick}><p className='button'>Star</p></div>}
                {this.props.isStarred && <div className='star-pokemon' onClick={this.handleClick}><p className='button'>Unstar</p></div>}
            </>
        );
    }
}