import React, { Component } from 'react';

export default class InfoContainer extends Component {
    render() {
        const infoArr = this.props.info.map((info, key) => {
            return <li key={key}>{info}</li>;
        })
        return(
            <div>
            <h1>{this.props.name}</h1>
            <ul className='hidden-overflow'>
                {infoArr}
            </ul>
            </div>
        );
    }
}