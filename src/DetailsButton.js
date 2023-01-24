import React, { Component } from 'react';

export default class DetailsButton extends Component {
    constructor(props) {
        super(props)

        this.state ={
            
        }
    }
    render() {
        return(
            <div onClick={this.props.onDetailsClick} className='details-button'>
                <p className='button'>Details</p>
            </div>
        );
    }
}