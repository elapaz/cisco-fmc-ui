import React, {Component} from 'react';

import AppLayout from "../components/layout/AppLayout";
import IconComputer from '@material-ui/icons/Computer';
import IconDevices from '@material-ui/icons/Devices';
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchNetworks} from "../store/actions/networkActions";
import {fetchHosts} from "../store/actions/hostActions";
import {fetchPortobjectgroups} from "../store/actions/portobjectgroupsActions";
import {fetchProtocolportobjects} from "../store/actions/protocolportobjectsActions";
import {fetchNetworkgroups} from "../store/actions/networkgroupsActions";
import {fetchAccessrules} from "../store/actions/accessrulesActions";
import {fetchRanges} from "../store/actions/rangesActions";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Typography";

const rowsPerPage = 11;

class HomeScreen extends Component {

    state = {
        selected: '',
        page: 0,
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    render() {
        const {hosts, networks, portobjectgroups, networkgroups, protocolportobjects, ranges} = this.props;
        const dataLength = this.getDataLength();
        const page = this.state.page;
        return (
            <AppLayout>
                <Grid container spacing={24}>
                    <Grid item xs={4}>
                        <List component="nav">
                            <ListItem button onClick={e => this.setState({selected: 'Host'})}>
                                <Avatar>
                                    <IconComputer/>
                                </Avatar>
                                <ListItemText primary="Objetos Host" secondary={hosts.length}/>
                            </ListItem>
                            <Divider/>
                            <ListItem button onClick={e => this.setState({selected: 'NetworkGroup'})}>
                                <Avatar>
                                    <IconDevices/>
                                </Avatar>
                                <ListItemText primary="Objetos NetworkGroup" secondary={networkgroups.length}/>
                            </ListItem>
                            <Divider/>
                            <ListItem button onClick={e => this.setState({selected: 'Network'})}>
                                <Avatar>
                                    <IconDevices/>
                                </Avatar>
                                <ListItemText primary="Objetos Network" secondary={networks.length}/>
                            </ListItem>
                            <Divider/>
                            <ListItem button onClick={e => this.setState({selected: 'Port'})}>
                                <Avatar>
                                    <IconDevices/>
                                </Avatar>
                                <ListItemText primary="Objetos Port" secondary={portobjectgroups.length}/>
                            </ListItem>
                            <Divider/>
                            <ListItem button onClick={e => this.setState({selected: 'Range'})}>
                                <Avatar>
                                    <IconDevices/>
                                </Avatar>
                                <ListItemText primary="Objetos Range" secondary={ranges.length}/>
                            </ListItem>
                            <Divider/>
                            <ListItem button onClick={e => this.setState({selected: 'Protocol'})}>
                                <Avatar>
                                    <IconDevices/>
                                </Avatar>
                                <ListItemText primary="Objetos Protocol" secondary={protocolportobjects.length}/>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={8}>
                        {this.renderSelected()}
                        {(dataLength > 0) && (<TablePagination
                            component="div"
                            count={dataLength}
                            rowsPerPage={rowsPerPage}
                            rowsPerPageOptions={[rowsPerPage]}
                            page={page}
                            backIconButtonProps={{
                                'aria-label': 'Previous',
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'Next',
                            }}
                            onChangePage={this.handleChangePage}
                        />)}
                    </Grid>
                </Grid>
            </AppLayout>
        );
    }

    renderSelected() {
        const selected = this.state.selected;
        switch (selected) {
            case 'Host':
                return this.renderHosts();
            case 'NetworkGroup':
                return this.renderNetworkGroup();
            case 'Network':
                return this.renderNetworks();
            case 'Port':
                return this.renderPortObjectGroups();
            case 'Range':
                return this.renderRanges();
            case 'Protocol':
                return this.renderProtocolPort();
            default:
                return ('');
        }

    }

    renderHosts() {
        const page = this.state.page;
        return (<Table>
            <TableHead>
                <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Valor</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {this.props.hosts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((id) => (
                    <TableRow key={id}>
                        <TableCell>
                            {this.props.hostsById[id].name}
                        </TableCell>
                        <TableCell>
                            {this.props.hostsById[id].value}
                        </TableCell></TableRow>))}

            </TableBody>
        </Table>);
    }

    renderNetworks() {
        const page = this.state.page;
        return (<Table>
            <TableHead>
                <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Valor</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {this.props.networks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((id) => (
                    <TableRow key={id}>
                        <TableCell>
                            {this.props.networksById[id].name}
                        </TableCell>
                        <TableCell>
                            {this.props.networksById[id].value}
                        </TableCell></TableRow>))}

            </TableBody>
        </Table>);
    }

    renderNetworkGroup() {
        const page = this.state.page;
        return (<Table>
            <TableHead>
                <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Valor</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {this.props.networkgroups.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((id) => (
                    <TableRow key={id}>
                        <TableCell>
                            {this.props.networkgroupsById[id].name}
                        </TableCell>
                        <TableCell>
                            {this.props.networkgroupsById[id].literals ? this.props.networkgroupsById[id].literals.map(
                                (l, idx) => (<Typography key={idx} noWrap>{l.value}</Typography>)) : ''}
                            {this.props.networkgroupsById[id].objects ? this.props.networkgroupsById[id].objects.map(
                                (l) => (<Typography key={l.id} noWrap> {l.name} </Typography>)) : ''}
                        </TableCell></TableRow>))}

            </TableBody>
        </Table>);
    }

    renderPortObjectGroups() {
        const page = this.state.page;
        return (<Table>
            <TableHead>
                <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Valor</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {this.props.portobjectgroups.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((id) => (
                    <TableRow key={id}>
                        <TableCell>
                            {this.props.portobjectgroupsById[id].name}
                        </TableCell>
                        <TableCell>
                            {this.props.portobjectgroupsById[id].objects ? this.props.portobjectgroupsById[id].objects.map(
                                (l) => (<Typography key={l.id} noWrap> {l.name}</Typography>)) : ''}
                        </TableCell></TableRow>))}

            </TableBody>
        </Table>);
    }

    renderRanges() {
        const page = this.state.page;
        return (<Table>
            <TableHead>
                <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Valor</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {this.props.ranges.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((id) => (
                    <TableRow key={id}>
                        <TableCell>
                            {this.props.rangesById[id].name}
                        </TableCell>
                        <TableCell>
                            {this.props.rangesById[id].value}
                        </TableCell></TableRow>))}

            </TableBody>
        </Table>);
    }

    renderProtocolPort() {
        const page = this.state.page;
        return (<Table>
            <TableHead>
                <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Puerto</TableCell>
                    <TableCell>Protocolo</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {this.props.protocolportobjects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((id) => (
                    <TableRow key={id}>
                        <TableCell>
                            {this.props.protocolportobjectsById[id].name}
                        </TableCell>
                        <TableCell>
                            {this.props.protocolportobjectsById[id].port}
                        </TableCell>
                        <TableCell>
                            {this.props.protocolportobjectsById[id].protocol}
                        </TableCell>
                    </TableRow>))}

            </TableBody>
        </Table>);
    }

    getDataLength() {
        const selected = this.state.selected;
        switch (selected) {
            case 'Host':
                return this.props.hosts.length;
            case 'NetworkGroup':
                return this.props.networkgroups.length;
            case 'Network':
                return this.props.networks.length;
            case 'Port':
                return this.props.portobjectgroups.length;
            case 'Range':
                return this.props.ranges.length;
            case 'Protocol':
                return this.props.protocolportobjects.length;
            default:
                return 0;
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        hosts: state.hosts.allIds,
        hostsById: state.hosts.byId,
        networks: state.networks.allIds,
        networksById: state.networks.byId,
        ranges: state.ranges.allIds,
        rangesById: state.ranges.byId,
        networkgroups: state.networkgroups.allIds,
        networkgroupsById: state.networkgroups.byId,
        portobjectgroups: state.portobjectgroups.allIds,
        portobjectgroupsById: state.portobjectgroups.byId,
        protocolportobjects: state.protocolportobjects.allIds,
        protocolportobjectsById: state.protocolportobjects.byId,
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
