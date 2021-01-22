/*
Given a state, get all reachable states by a transition.

Parameters:
    State: String - State to apply the function
    data_states: a list of structures where is a transition and a 
                    destiny state, example: {transition:"a",destiny_state:"2"}
    transition: String - selected transition to search

Returns:
    Return a list of all reachable states by a transition.
*/

export default function get_reachable_states(state, data_states, transition) {

    let epsilon_states = get_epsilon_reachable_states(state, data_states);
    let moved_states = epsilon_states
                        .map(s=>move(s,data_states,transition)) // move through transition
                        .filter(item=>item!=0) // eliminate empty ones

    // get epsilons transitions of each state resulting in an array of 3 dimensions
    let epsilon_moved_states = moved_states
            .map(s=>s.map(t=>get_epsilon_reachable_states(t,data_states))) 
            .flat(2)                                                   // flat to 1d
            .filter((item,index,self) => self.indexOf(item)===index)   //eliminate duplicate values
            .join("");                                                 //name of the state
    return epsilon_moved_states
}

/*
Move a state through a transition

Parameters:
    State: String
    data_states: A list of structures where is a transition and a destiny state, example:
                        {transition:"a",destiny_state_name:"2"}
    Transition: String 

Returns:
    Return a list of all states conected by the transition
*/
function move(state,data_states,transition){
    let transitions = data_states.find(s=>s.state_name==state).transitions //get all transitions of each state
            .filter(t=>t.transition=== transition); // filter them by the transition we need
    transitions = transitions.map(item=>item.destiny_state_name)
    return transitions
}

/*
Given a state, get all reachable states by a epsilon

Parameters:
    State: String
    data_states: Structure where is a transition and a destiny state, example:
                        {transition:"a",destiny_state_name:"2"}

Returns:
    Return a list of all states conected by epsilon
*/

function get_epsilon_reachable_states(state, data_states, searchedStates=[]) {
    let epsilon_reachable_states = [state]; // It's implicit that all states has a epsilon
    // transition to themselves
    searchedStates.concat(state);
    //console.log(JSON.stringify(reachable_states ,null,2))
    
    data_states.find(s => s.state_name === state).transitions.forEach(t => {
        if (t.transition === "e" && !(searchedStates.includes(t.destiny_state_name))){ 
            epsilon_reachable_states = epsilon_reachable_states
                    .concat(get_epsilon_reachable_states(t.destiny_state_name, data_states,searchedStates))
        }    
    });
    /*
    let result = [...epsilon_reachable_states];

    epsilon_reachable_states.forEach(el => {
        if(!searchedStates.includes(el)){ // if is not already searched
            searchedStates.concat(state);
            result.concat(
                get_epsilon_reachable_states(el, reachable_states,searchedStates)
                //
            );
            searchedStates.concat(state);
        }
    });
*/
    return epsilon_reachable_states;
}