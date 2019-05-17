import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import BuildIcon from '@material-ui/icons/Build';
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {history} from '../../services/history';

export const menuItems = (
    <div>
        <ListItem button onClick={() => {
            history.push('/');
        }}>
            <ListItemIcon>
                <HomeIcon/>
            </ListItemIcon>
            <ListItemText primary="Inicio"/>
        </ListItem>
        <ListItem button onClick={() => {
            history.push('/audit');
        }}>
            <ListItemIcon>
                <SearchIcon/>
            </ListItemIcon>
            <ListItemText primary="Auditoría"/>
        </ListItem>
        <ListItem button onClick={() => {
            history.push('/rules');
        }}>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary="Reglas"/>
        </ListItem>
        <ListItem button onClick={() => {
            history.push('/objects');
        }}>
            <ListItemIcon>
                <BuildIcon/>
            </ListItemIcon>
            <ListItemText primary="Objetos"/>
        </ListItem>
    </div>
);