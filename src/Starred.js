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
                <div className='star-pokemon' onClick={this.handleClick}><p className='star'>Star</p></div>
            </>
        );
    }
}