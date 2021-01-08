import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            states: [{state_name: "", transitions: [{transition:"", destiny_state_name: ""}]}]
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    addClick() {
        this.setState(prevState => ({
            states: [...prevState.states, {state_name: "", transitions: [{transition:"", destiny_state_name: ""}] }]
        }))
    }

    addTransition(i,el) {
        let newState = [...this.state.states]

        el.transitions = el.transitions.concat([{transition:"", destiny_state_name: ""}]);
        newState[i] = el

        this.setState({
            states: newState
        });
    }

    removeTransition(i, index,el){
        let newState = [...this.state.states]

        el.transitions.splice(index, 1);
        newState[i] = el

        this.setState({
            states: newState
        });
    }

    removeClick(i) {
        let states = [...this.state.states];
        states.splice(i, 1);
        this.setState({ states });
    }

    createUI() {
        return this.state.states.map((el, i) => (
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
                <input type='button' value='remove state' onClick={this.removeClick.bind(this, i)} />
            </div>
        ))
    }
    
    handleTransitionChange(i,index,e){
        const { name, value } = e.target;
        let states = [...this.state.states];
        states[i].transitions[index] = { ...states[i].transitions[index], [name]: value };
        this.setState({ states });
    }

    handleChange(i, e) {
        const { name, value } = e.target;
        let states = [...this.state.states];
        states[i] = { ...states[i], [name]: value };
        this.setState({ states });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + JSON.stringify(this.state.states));
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.createUI()}
                <input type='button' value='add new state' onClick={this.addClick.bind(this)} />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));