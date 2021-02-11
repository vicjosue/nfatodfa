import React from 'react';

class Table extends React.Component {

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

                        <tr key={i}>
                            <td>{s.state}</td>
                            {s.transitions.map((transition,t_i)=>
                                <td key={t_i}>{transition.destiny_state}</td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default Table;
