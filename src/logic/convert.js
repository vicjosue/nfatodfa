import get_reachable_states from "./get_reachable_states"
import listEqual from "./listEqual"

export default function convert(nfa) {
    let q_zero = nfa.initialState;

    nfa.nfa.forEach(state => state.transitions.forEach(l => {
        if (nfa.transitions.indexOf(l.transition) < 0 && l.transition !== 'e')
            nfa.transitions.push(l.transition)
    }
    ));

    let alphabet = nfa.transitions;
    let data = nfa.nfa; // states with transitions

    /*

    table of the dfa:

      | t1 | t2
    a |  a |  b
    b |  c |  cd

    represantive structure:

    [
        {
            state: [a]
            transitions: [
                "destiny_state": [
                    "a"
                ],
                "transition": "t1"
                },
                {
                "destiny_state": [
                    "b"
                ],
                "transition": "t2",
                }
            ]
        },
        {
            state: [b]
            transitions: [
                "destiny_state": [
                    "c"
                ],
                "transition": "t1"
                },
                {
                "destiny_state": [
                    c,d
                ],
                "transition": "t2",
                }
            ]
        },
    ]
    */

    let dfa = [];
    let searched = [];
    let temp_reachable_states = [];
    let actual_State;
    let new_state;

    let queue=[[q_zero]];
    while(queue.length!==0){
        actual_State=queue[0];// [c d]
        queue.shift(); //delete first element
        new_state = { state: actual_State, transitions: [], final_state: false }

        searched.push(actual_State);
        
        alphabet.forEach(t => { // t1
            temp_reachable_states = [];

            actual_State.forEach(q => { // c
                temp_reachable_states = temp_reachable_states.concat(get_reachable_states(q, data, t)); 
            });
            temp_reachable_states = temp_reachable_states.filter((item,index,self) => self.indexOf(item)===index)   //eliminate duplicate values
            
            new_state.transitions.push({
                destiny_state: temp_reachable_states,
                transition: t
            });
            if (!existsInList(queue, temp_reachable_states) && !existsInList(searched, temp_reachable_states))
                queue.push(temp_reachable_states); 
        });
        dfa.push(new_state);
    }
    dfa.forEach(state=>{
        state.state.forEach(s => {
            if(data.find(d=>s===d.state_name).final_state)
                state.final_state=true;
        })
    })
    return dfa
}

function existsInList(queue, state) {
    for (let i = 0; i < queue.length; i++) {
        if (listEqual(queue[i], state))
            return true;
    }
    return false;
}