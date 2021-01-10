import React from 'react';

class Form extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    addState() {
        this.props.updateState(
            [...this.props.formValues.states, {state_name: "", transitions: [{transition:"", destiny_state_name: ""}] }]
        );
    }

    addTransition(i,el) {
        let newState = [...this.props.formValues.states]
        el.transitions = el.transitions.concat([{transition:"", destiny_state_name: ""}]);
        newState[i] = el

        this.props.updateState(newState);
        
    }

    removeTransition(i, index,el){
       let newState = [...this.props.formValues.states];
        if(newState[i].transitions.length>1){
            el.transitions.splice(index, 1);
            newState[i] = el

            this.props.updateState(newState);
        } else {
            alert('A state has to have at least 1 transition');
        }
    }
    

    removeState(i) {
        let newState = [...this.props.formValues.states];
        newState.splice(i, 1);
        this.props.updateState(newState);
    }

    createUI() {
        console.log(this.props.formValues);
        return this.props.formValues.states.map((el, i) => (
            <div key={i}>
                <input placeholder="State" name="state_name" value={el.state_name || ''} onChange={this.handleChange.bind(this, i)} />
                {el.transitions.map((item,index) => (
                    <li key={index}> 
                        <input placeholder="transition" name="transition" value={item.transition || ''} onChange={this.handleTransitionChange.bind(this, i,index)} />
                        <input placeholder="destiny_state_name" name="destiny_state_name" value={item.destiny_state_name || ''} onChange={this.handleTransitionChange.bind(this, i,index)} />
                        <input type='button' value='remove transition' onClick={this.removeTransition.bind(this,i, index, el)} />
                    </li>
                ) )}
                <input type='button' value='add transition' onClick={this.addTransition.bind(this, i, el)} />
                <input type='button' value='remove state' onClick={this.removeState.bind(this, i)} />
            </div>
        ))
    }
    
    handleTransitionChange(i,index,e){
        const { name, value } = e.target;
        let states = [...this.props.formValues.states];
        states[i].transitions[index] = { ...states[i].transitions[index], [name]: value };
        this.props.updateState( states );
    }

    handleChange(i, e) {
        const { name, value } = e.target;
        let states = [...this.props.formValues.states];
        states[i] = { ...states[i], [name]: value };
        this.props.updateState( states );
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + JSON.stringify(this.props.formValues.states));
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.createUI()}
                <input type='button' value='add new state' onClick={this.addState.bind(this)} />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default Form;