import React from 'react';

import Form from './form'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            states: [{ state_name: "", transitions: [{ transition: "", destiny_state_name: "" }] }]
        };
        this.updateState = this.updateState.bind(this)
    }

    updateState(newState) {
        this.setState({
            states: newState
        })
    }

    render() {
        return (
            <div>
                <Form
                    updateState={this.updateState.bind(this)}
                    formValues={this.state}
                />
            </div>
        );
    }
}

export default App;