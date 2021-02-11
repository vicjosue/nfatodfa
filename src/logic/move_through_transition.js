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
export default function move_through_transition(state,data_states,transition){
    let transitions = data_states.find(s=>s.state_name===state).transitions //get all transitions of each state

            .filter(t=>t.transition=== transition); // filter them by the transition we need
    transitions = transitions.map(item=>item.destiny_state_name)
    return transitions
}

