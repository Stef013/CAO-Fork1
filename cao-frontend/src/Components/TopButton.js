import React from 'react';
import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey';

const color = grey[50];

export default function TopButton(props) {
    return (
        <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '1rem'}}>
            <Button onClick={props.onClick} style={{color: color}}>{props.text}</Button>
        </div>
    );
}