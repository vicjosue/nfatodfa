import get_reachable_states from "./get_reachable_states"

export default function convert(nfa) {
    let q_prime = nfa.initialState;
    let data = [
        {"state_name":"A",
            "transitions":[{"transition":"e","destiny_state_name":"B"},
            {"transition":"0","destiny_state_name":"A"},
            {"transition":"0","destiny_state_name":"C"}]},
        {"state_name":"B","transitions":[
            {"transition":"e","destiny_state_name":"C"},
            {"transition":"1","destiny_state_name":"B"}]},
        {"state_name":"C",
            "transitions":[{"transition":"0","destiny_state_name":"C"},
            {"transition":"1","destiny_state_name":"C"}]}
        ];
    console.log(get_reachable_states(
        "C",
        data,
        "0"
        /*
        nfa.initialState,
        nfa.states,
        "0"
        get_reachable_states(
            "A",
            [ 
                {transition:"0",destiny_state_name:"A"},
                {transition:"e",destiny_state_name:"A"},
                {transition:"1",destiny_state_name:"B"},
                {transition:"e",destiny_state_name:"B"},
                {transition:"0",destiny_state_name:"C"},
                {transition:"1",destiny_state_name:"C"}
            ],
            "0"
        )*/
        )
    )
}