import React from 'react';
import convert from '../logic/convert';

import Form from './form'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            states: [{ state_name: "", transitions: [{ transition: "", destiny_state_name: "" }] }],
            transitions: [""],
            initialState:""
        };
        this.updateState = this.updateState.bind(this)
    }

    updateState(newState) {
        this.setState(newState)
    }

    convert(){
        convert(this.state)
    }

    render() {
        return (
            <div>
                <Form
                    updateState={this.updateState.bind(this)}
                    formValues={this.state}
                />
                <input type="button" value="convert" onClick={this.convert.bind(this)} />
            </div>
        );
    }
}

export default App;