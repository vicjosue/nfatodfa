import React from 'react';

class Form extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    addState() {
        this.props.updateState({
            nfa: [...this.props.formValues.nfa, {state_name: "", final_state:false, transitions: [{transition:"", destiny_state_name: ""}] }]
        });
    }

    addStateTransition(i,state) {
        let newState = [...this.props.formValues.nfa]
        state.transitions = state.transitions.concat([{transition:"", destiny_state_name: ""}]);
        newState[i] = state

        this.props.updateState(
        {
            nfa: newState
        });
    }

    removeStateTransition(i, index,state){
       let newState = [...this.props.formValues.nfa];
            state.transitions.splice(index, 1);
            newState[i] = state

            this.props.updateState(
                {
                    nfa: newState
                });
    }
    

    removeState(i) {
        let newState = [...this.props.formValues.nfa];
        newState.splice(i, 1);
        this.props.updateState(
            {
                nfa: newState
            });
    }

    isFinalState(i,state){
        let newState = [...this.props.formValues.nfa]
        state.final_state=!state.final_state;
        newState[i] = state

        this.props.updateState(
        {
            nfa: newState
        });
    }

    createUI() {
        return this.props.formValues.nfa.map((state, i) => (
            <div key={i}>
                <input placeholder="State" name="state_name" value={state.state_name || ''} onChange={this.handleNameChange.bind(this, i)} />
                {state.transitions.map((item,index) => (
                    <li key={index}> 
                        <input placeholder="transition" name="transition" value={item.transition || ''} onChange={this.handleStateTransitionChange.bind(this, i,index)} />
                        <input placeholder="destiny state name" name="destiny_state_name" value={item.destiny_state_name || ''} onChange={this.handleStateTransitionChange.bind(this, i,index)} />
                        <input type='button' value='remove state transition' onClick={this.removeStateTransition.bind(this,i, index, state)} />
                    </li>
                ) )}

                <input type="checkbox" value={state.final_state} defaultChecked={state.final_state} onChange={this.isFinalState.bind(this, i,state)} />
                
                <input type='button' value='add state transition' onClick={this.addStateTransition.bind(this, i, state)} />
                <input type='button' value='remove state' onClick={this.removeState.bind(this, i)} />
            </div>
        ))
    }
    
    handleStateTransitionChange(i,index,e){
        const { name, value } = e.target;
        let newState = [...this.props.formValues.nfa];
        newState[i].transitions[index] = { ...newState[i].transitions[index], [name]: value };
        this.props.updateState(
            {
                nfa: newState
            });
    }

    handleNameChange(i, e) {
        const { name, value } = e.target;
        let newState = [...this.props.formValues.nfa];
        newState[i] = { ...newState[i], [name]: value };
        this.props.updateState(
            {
                nfa: newState
            });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + JSON.stringify(this.props.formValues));
        event.preventDefault();
    }

    handleChange(e){
        const { name, value } = e.target;
        this.props.updateState({[name]: value});
    }

    addTransition(){

        this.props.updateState({transitions: this.props.formValues.transitions.concat("")});
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.createUI()}

                <input placeholder="start state" name="initialState" value={ this.props.formValues.initialState} onChange={this.handleChange.bind(this)} />

                <input type='button' value='add new state' onClick={this.addState.bind(this)} />
            </form>
        );
    }
}

export default Form;