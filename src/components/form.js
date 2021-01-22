import React from 'react';

class Form extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    addState() {
        this.props.updateState({
            states: [...this.props.formValues.states, {state_name: "", transitions: [{transition:"", destiny_state_name: ""}] }]
        });
    }

    addStateTransition(i,el) {
        let newState = [...this.props.formValues.states]
        el.transitions = el.transitions.concat([{transition:"", destiny_state_name: ""}]);
        newState[i] = el

        this.props.updateState(
        {
            states: newState
        });
    }

    removeStateTransition(i, index,el){
       let newState = [...this.props.formValues.states];
        if(newState[i].transitions.length>1){
            el.transitions.splice(index, 1);
            newState[i] = el

            this.props.updateState(
                {
                    states: newState
                });
            
        } else {
            alert('A state has to have at least 1 transition');
        }
    }
    

    removeState(i) {
        let newState = [...this.props.formValues.states];
        newState.splice(i, 1);
        this.props.updateState(
            {
                states: newState
            });
    }

    createUI() {
        return this.props.formValues.states.map((el, i) => (
            <div key={i}>
                <input placeholder="State" name="state_name" value={el.state_name || ''} onChange={this.handleNameChange.bind(this, i)} />
                {el.transitions.map((item,index) => (
                    <li key={index}> 
                        <input placeholder="transition" name="transition" value={item.transition || ''} onChange={this.handleStateTransitionChange.bind(this, i,index)} />
                        <input placeholder="destiny state name" name="destiny_state_name" value={item.destiny_state_name || ''} onChange={this.handleStateTransitionChange.bind(this, i,index)} />
                        <input type='button' value='remove state transition' onClick={this.removeStateTransition.bind(this,i, index, el)} />
                    </li>
                ) )}
                <input type='button' value='add state transition' onClick={this.addStateTransition.bind(this, i, el)} />
                <input type='button' value='remove state' onClick={this.removeState.bind(this, i)} />
            </div>
        ))
    }
    
    handleStateTransitionChange(i,index,e){
        const { name, value } = e.target;
        let newState = [...this.props.formValues.states];
        newState[i].transitions[index] = { ...newState[i].transitions[index], [name]: value };
        this.props.updateState(
            {
                states: newState
            });
    }

    handleNameChange(i, e) {
        const { name, value } = e.target;
        let newState = [...this.props.formValues.states];
        newState[i] = { ...newState[i], [name]: value };
        this.props.updateState(
            {
                states: newState
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

    handleTransitionChange(i,e){
        const { value } = e.target;
        let newTransitions = [...this.props.formValues.transitions];
        newTransitions[i] = value
        this.props.updateState(
            {
                transitions: newTransitions
            });
    }

    removeTransition(i){
        let newTransitions = [...this.props.formValues.transitions];
        newTransitions.splice(i, 1);
        this.props.updateState({transitions: newTransitions});
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.createUI()}

                <input placeholder="start state" name="initialState" value={ this.props.formValues.initialState} onChange={this.handleChange.bind(this)} />

                {this.props.formValues.transitions.map((el, i) => (
                    <div key={i}>
                        <input placeholder="transition" name="transition" value={el || ''} onChange={this.handleTransitionChange.bind(this, i)} />
                        <input type='button' value='remove transition' onClick={this.removeTransition.bind(this, i)} />
                    </div>
                ))}
                <input type='button' value='add transition' onClick={this.addTransition.bind(this)} />
                <input type='button' value='add new state' onClick={this.addState.bind(this)} />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default Form;