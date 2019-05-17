import React, {Component} from 'react';

import AppLayout from "../components/layout/AppLayout";
import IconComputer from '@material-ui/icons/Computer';
import IconDevices from '@material-ui/icons/Devices';
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {connect} from "react-redux";
import Fab from "@material-ui/core/Fab";
import SyncIcon from '@material-ui/icons/Sync';
import {bindActionCreators} from "redux";
import {fetchNetworks} from "../store/actions/networkActions";
import {fetchHosts} from "../store/actions/hostActions";
import {fetchPortobjectgroups} from "../store/actions/portobjectgroupsActions";
import {fetchProtocolportobjects} from "../store/actions/protocolportobjectsActions";
import {fetchNetworkgroups} from "../store/actions/networkgroupsActions";
import {fetchAccessrules} from "../store/actions/accessrulesActions";
import {fetchRanges} from "../store/actions/rangesActions";

class HomeScreen extends Component {

    handleSyncHosts = () => {
        this.props.fetchHosts();
    };

    handleSyncNetworks = () => {
        this.props.fetchNetworks();
    };

    handleSyncNetworkGroups = () => {
        this.props.fetchNetworkgroups();
    };

    handleSyncPortObjectGroups = () => {
        this.props.fetchPortobjectgroups();
    }

    handleSyncProtocolPortObjects = () => {
        this.props.fetchProtocolportobjects();
    }

    handleSyncAccessRules = () => {
        this.props.fetchAccessrules();
    }

    handleSyncRanges = () => {
        this.props.fetchRanges();
    }


    render() {
        const {hosts, networks, accessrules, portobjectgroups, networkgroups, protocolportobjects, ranges} = this.props;
        return (
            <AppLayout>
                <Grid container spacing={24}>
                    <Grid item xs={4}>
                        <Paper>
                            <ListItem>
                                <Avatar>
                                    <IconComputer/>
                                </Avatar>
                                <ListItemText primary="Objetos AccessRule" secondary={accessrules.length}/>
                                <Fab color="primary" aria-label="Sync" onClick={this.handleSyncAccessRules} size="small">
                                    <SyncIcon/>
                                </Fab>
                            </ListItem>
                            <ListItem>
                                <Avatar>
                                    <IconComputer/>
                                </Avatar>
                                <ListItemText primary="Objetos Host" secondary={hosts.length}/>
                                <Fab color="primary" aria-label="Sync" onClick={this.handleSyncHosts} size="small">
                                    <SyncIcon/>
                                </Fab>
                            </ListItem>
                            <ListItem>
                                <Avatar>
                                    <IconDevices/>
                                </Avatar>
                                <ListItemText primary="Objetos NetworkGroup" secondary={networkgroups.length}/>
                                <Fab color="primary" aria-label="Sync" onClick={this.handleSyncNetworkGroups} size="small">
                                    <SyncIcon/>
                                </Fab>
                            </ListItem>
                            <ListItem>
                                <Avatar>
                                    <IconDevices/>
                                </Avatar>
                                <ListItemText primary="Objetos Network" secondary={networks.length}/>
                                <Fab color="primary" aria-label="Sync" onClick={this.handleSyncNetworks} size="small">
                                    <SyncIcon/>
                                </Fab>
                            </ListItem>
                            <ListItem>
                                <Avatar>
                                    <IconDevices/>
                                </Avatar>
                                <ListItemText primary="Objetos Port" secondary={portobjectgroups.length}/>
                                <Fab color="primary" aria-label="Sync" onClick={this.handleSyncPortObjectGroups} size="small">
                                    <SyncIcon/>
                                </Fab>
                            </ListItem>
                            <ListItem>
                                <Avatar>
                                    <IconDevices/>
                                </Avatar>
                                <ListItemText primary="Objetos range" secondary={ranges.length}/>
                                <Fab color="primary" aria-label="Sync" onClick={this.handleSyncRanges} size="small">
                                    <SyncIcon/>
                                </Fab>
                            </ListItem>
                            <ListItem>
                                <Avatar>
                                    <IconDevices/>
                                </Avatar>
                                <ListItemText primary="Objetos Protocol" secondary={protocolportobjects.length}/>
                                <Fab color="primary" aria-label="Sync" onClick={this.handleSyncProtocolPortObjects} size="small">
                                    <SyncIcon/>
                                </Fab>
                            </ListItem>

                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>

                </Grid>


            </AppLayout>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        hosts: state.hosts.allIds,
        networks: state.networks.allIds,
        ranges: state.ranges.allIds,
        networkgroups: state.networkgroups.allIds,
        accessrules: state.accessrules.allIds,
        portobjectgroups: state.portobjectgroups.allIds,
        protocolportobjects:  state.protocolportobjects.allIds,
    }
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            fetchHosts,
            fetchNetworks,
            fetchAccessrules,
            fetchNetworkgroups,
            fetchRanges,
            fetchProtocolportobjects,
            fetchPortobjectgroups,
        },
        dispatch,
    );


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
