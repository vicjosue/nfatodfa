
import get_epsilon_reachable_states from './get_epsilon_reachable_states';
import move_through_transition from './move_through_transition';
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
                        .map(s=>move_through_transition(s,data_states,transition))
                        .filter(item=>item.length!==0) // eliminate empty ones
    // get epsilons transitions of each state resulting in an array of 3 dimensions
    let epsilon_moved_states = moved_states
            .map(s=>s.map(t=>get_epsilon_reachable_states(t,data_states))) 
            .flat(2)                                                   // flat to 1d
            .filter((item,index,self) => self.indexOf(item)===index)   //eliminate duplicate values
    return epsilon_moved_states
}

