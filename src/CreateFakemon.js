import React, {Component} from 'react'

export default class CreateFakemon extends Component {
    render() {
        return(
            <div>
                <h1>Create Fakemon</h1>
                <div className='dex-entry'>
                    <h3>Fakemon Name And Description: </h3>
                    <input type='text' value={this.props.fakemonName} onChange={(e) => {this.props.onEditFakemonName(e)}} placeholder='Enter fakemon name'/>
                    <button onClick={(e) => {this.props.onNewFakemon(e)}}>Create Fakemon</button>
                </div>
            </div>
        );
    }
}