import React from 'react';
import convert from '../logic/convert';

import Form from './form'
import Table from './table'

class App extends React.Component {
    constructor(props) {
        super(props)
        //[{ state_name: "", transitions: [{ transition: "", destiny_state_name: "" }] }]
       this.state = {
            nfa: [{ state_name: "",final_state: false, transitions: [{ transition: "", destiny_state_name: "" }] }],
            transitions: [],
            initialState: "",
            dfa:[],
            showResult: false
        };
        this.updateState = this.updateState.bind(this)
    }

    updateState(newState) {
        this.setState(newState)
    }

    showDfa() {
        try{
            this.setState({ dfa: convert(this.state),
            showResult : true })
        } catch (error) {
            console.error(error);
            this.setState({ showResult : true })
        }
    }

    ModeEdit(){
        this.setState({ showResult: false })
    }

    render() {
        return (
            <div>
                {
                this.state.showResult?
                <div>
                    <Table 
                        data={this.state} 
                    ></Table>
                    <input type="button" value="Go back" onClick={this.ModeEdit.bind(this)} />
                </div>
                :
                <div>
                    <Form
                        updateState={this.updateState.bind(this)}
                        formValues={this.state}
                    ></Form>
                    <input type="button" value="convert" onClick={this.showDfa.bind(this)} />
                </div>
                }
                
            </div>
        );
    }
}

export default App;