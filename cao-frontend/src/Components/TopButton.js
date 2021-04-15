import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey';

const color = grey[50];

const useStyles = makeStyles((theme) => ({
    
}));

export default function TopButton(props) {
    const classes = useStyles();
    const history = useHistory();

    console.log(color);

    return (
        <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '1rem'}}>
            <Button onClick={props.onClick} style={{color: color}}>{props.text}</Button>
        </div>
    );
}