import React from 'react';

export default function Row(props){
    return (
        <tr>
            <td>{props.data.title}</td>
            <td>{props.data.description}</td>
            <td>{props.data.payPerSignature}</td>
            <td>{props.data.publishedDate}</td>
        </tr>
    )
}