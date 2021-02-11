import React from 'react';

class Table extends React.Component {

    null_handler(list,i){
        if(list.length===0)
            return "∅"
        return list.join("");;
    }

    render() {
        return (
            <table>
                <tbody>
                    <tr>
                        <th> </th>
                        {this.props.data.transitions.map((el, i) => (
                            <th key={i}>{el}</th>
                        ))}
                    </tr>
                    
                    {this.props.data.dfa.map((s,i) => (

                        <tr key={i} >
                            <td style={ s.final_state ? { fontWeight: 'bold' } : { fontWeight: 'normal' } } >{this.null_handler(s.state,i)}</td>
                            {s.transitions.map((transition,t_i)=>
                                <td key={t_i}>{this.null_handler(transition.destiny_state)}</td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default Table;
