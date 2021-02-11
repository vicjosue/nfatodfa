/*
Given a state, get all reachable states by a epsilon

Parameters:
    State: String
    data_states: Structure where is a transition and a destiny state, example:
                        {transition:"a",destiny_state_name:"2"}

Returns:
    Return a list of all states conected by epsilon
*/

export default function get_epsilon_reachable_states(state, data_states, searchedStates=[]) {
    
    let epsilon_reachable_states = [state]; // It's implicit that all states has a epsilon
    // transition to themselves
    searchedStates = searchedStates.concat(state);

    data_states.find(s => s.state_name === state).transitions.forEach(t => {
        if (t.transition === "e" && !(searchedStates.includes(t.destiny_state_name))){ 
            epsilon_reachable_states = epsilon_reachable_states
                    .concat(get_epsilon_reachable_states(t.destiny_state_name, data_states,searchedStates))
        }
    });

    return epsilon_reachable_states;
}