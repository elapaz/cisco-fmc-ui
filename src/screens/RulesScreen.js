import React from 'react';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import AppLayout from "../components/layout/AppLayout";
import Paper from "@material-ui/core/Paper";
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import IconComputer from '@material-ui/icons/Computer';
import IconDevices from '@material-ui/icons/Devices';
import IconSetting from '@material-ui/icons/Settings';
import Typography from "@material-ui/core/Typography";
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import RuleExpander from "../services/data";
import {connect} from "react-redux";
import {filterRules} from "../services/filters";
import {fetchHosts} from "../store/actions/hostActions";
import {fetchNetworks} from "../store/actions/networkActions";
import {fetchAccessrules} from "../store/actions/accessrulesActions";
import {fetchNetworkgroups} from "../store/actions/networkgroupsActions";
import {fetchProtocolportobjects} from "../store/actions/protocolportobjectsActions";
import {fetchPortobjectgroups} from "../store/actions/portobjectgroupsActions";
import {bindActionCreators} from "redux";
import {fetchRanges} from "../store/actions/rangesActions";

const rowsPerPage = 11;

const styles = {
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    icono: {
        verticalAlign: 'middle',
    },

};

class RulesScreen extends React.Component {

    state = {
        page: 0,
        search: '',
        srcNet: '',
        dstNet: '',
        srcZone: '',
        srcPort: '',
        dstPort: '',
    }

    renderIcon = (type) => {
        switch (type) {
            case 'Host':
                return (<IconComputer style={styles.icono}/>);
            case 'Network':
                return (<IconDevices style={styles.icono}/>);
            default:
                return (<IconDevices style={styles.icono}/>);
        }
    }

    renderZone = (zone) => {
        if (zone && zone.objects) {
            return zone.objects.map((z) => {
                return (<Typography key={z.id} noWrap>
                    <DeviceHubIcon style={styles.icono}/>{z.name}</Typography>)
            })
        }
        return ('Any');
    }

    renderTooltipForNetworkObject = ({type, value, objects, ...others}) => {
        switch (type) {
            case 'Host':
                return value;
            case 'Network':
                return value;
            case 'Range':
                return value;
            case 'NetworkGroup':
                return objects.map((o) => this.renderTooltipForNetworkObject(o)).join(", ");
            default:
                return value || '';
        }
    }

    renderTooltipForPortObject = ({type, port, protocol, name, objects, ...others}) => {
        switch (type) {
            case 'ProtocolPortObject':
                return port + '/' + protocol;
            case 'ICMPV4Object':
                return 'icmp/' + name;
            case 'PortObjectGroup':
                return objects.map((o) => this.renderTooltipForPortObject(o)).join(", ");
            default:
                return port || '';
        }
    }

    renderNetworks = (net) => {
        let returnList = [];
        if (net && net.objects) {
            returnList = returnList.concat(net.objects.map((z) => {
                return (<Tooltip key={z.id} title={this.renderTooltipForNetworkObject(z)}
                                 aria-label={this.renderTooltipForNetworkObject(z)}><Typography
                    noWrap>{this.renderIcon(z.type)}
                    {z.name}</Typography></Tooltip>)
            }))
        }
        if (net && net.literals) {
            returnList = returnList.concat(net.literals.map((z, idx) => {
                return (<Tooltip key={idx} title={z.value} aria-label={z.value}><Typography noWrap><IconDevices
                    style={styles.icono}/>
                    {z.value}</Typography></Tooltip>)
            }))
        }
        return returnList.length > 0 ? returnList : ('Any');
    }


    renderPortName = (protocol) => {
        switch (protocol) {
            case "1":
                return "ICMP";
            case "6":
                return "TCP";
            case "17":
                return "UDP";
            default:
                return "{" + protocol + "}";

        }
    }

    renderPorts = (ports) => {
        let returnList = [];
        if (ports && ports.objects) {
            returnList = returnList.concat(ports.objects.map((z) => {
                return (<Tooltip key={z.id} title={this.renderTooltipForPortObject(z)}
                                 aria-label={this.renderTooltipForPortObject(z)}><Typography noWrap><IconSetting
                    style={styles.icono}/>
                    {z.name}</Typography></Tooltip>)
            }))
        }
        if (ports && ports.literals) {
            returnList = returnList.concat(ports.literals.map((z, idx) => {
                if (z.type === "ICMPv4PortLiteral") {
                    return (<Tooltip key={idx}
                                     title={this.renderPortName(z.protocol) + (z.icmpType ? '/' + z.icmpType : '')}
                                     aria-label={this.renderPortName(z.protocol) + (z.icmpType ? '/' + z.icmpType : '')}><Typography
                        noWrap><IconSetting style={styles.icono}/>
                        {this.renderPortName(z.protocol)}{z.icmpType ? '/' + z.icmpType : ''}</Typography></Tooltip>)
                }
                return (<Tooltip title={this.renderPortName(z.protocol) + (z.port ? '/' + z.port : '')}
                                 aria-label={this.renderPortName(z.protocol) + (z.port ? '/' + z.port : '')}
                                 key={idx}><Typography noWrap><IconSetting style={styles.icono}/>
                    {this.renderPortName(z.protocol)}{z.port ? '/' + z.port : ''}</Typography></Tooltip>)
            }))
        }

        return returnList.length > 0 ? returnList : ('Any');
    }

    getData = () => {
        const {search, srcNet, srcPort, dstNet, dstPort, srcZone} = this.state;

        let ruleExpander = new RuleExpander(this.props);
        return filterRules(ruleExpander.getExpandedAccessRules(), search, srcZone, srcNet, dstNet, srcPort, dstPort);
    }

    handleLoadFull = () => {
        this.props.fetchHosts();
        this.props.fetchNetworks();
        this.props.fetchAccessrules();
        this.props.fetchNetworkgroups();
        this.props.fetchRanges();
        this.props.fetchProtocolportobjects();
        this.props.fetchPortobjectgroups();
    }

    render() {
        const {page} = this.state;
        const {blank, loading} = this.props;

        if (loading) {
            return (<AppLayout>
                <CircularProgress/>
            </AppLayout>);
        }

        if (blank) {
            return (<AppLayout>

                Para ver el buscador de politicas necesitamos cargar los datos antes
                <br/>
                <br/>
                <Button variant="contained" color="primary" onClick={this.handleLoadFull}>Descargar datos</Button>

            </AppLayout>);
        }

        const data = this.getData();
        return (<AppLayout>
            <Paper elevation={1} style={styles.root}>

                <Input
                    style={styles.input}
                    placeholder="Nombre"
                    onChange={e => this.setState({search: e.target.value})}
                    inputProps={{
                        'aria-label': 'Nombre',
                    }}
                    value={this.state.search}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={e => this.setState({search: ''})}
                            ><Icon>clear</Icon>
                            </IconButton>
                        </InputAdornment>
                    }
                />

                <Input
                    style={styles.input}
                    placeholder="Zona Origen"
                    onChange={e => this.setState({srcZone: e.target.value})}
                    inputProps={{
                        'aria-label': 'Zona Origen',
                    }}
                    value={this.state.srcZone}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={e => this.setState({srcZone: ''})}
                            ><Icon>clear</Icon>
                            </IconButton>
                        </InputAdornment>
                    }
                />

                <Input
                    style={styles.input}
                    placeholder="IP Origen"
                    onChange={e => this.setState({srcNet: e.target.value})}
                    inputProps={{
                        'aria-label': 'IP Origen',
                    }}
                    value={this.state.srcNet}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={e => this.setState({srcNet: ''})}
                            ><Icon>clear</Icon>
                            </IconButton>
                        </InputAdornment>
                    }
                />

                <Input
                    style={styles.input}
                    placeholder="IP Destino"
                    onChange={e => this.setState({dstNet: e.target.value})}
                    inputProps={{
                        'aria-label': 'IP Destino',
                    }}
                    value={this.state.dstNet}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={e => this.setState({dstNet: ''})}
                            ><Icon>clear</Icon>
                            </IconButton>
                        </InputAdornment>
                    }
                />

                <Input
                    style={styles.input}
                    placeholder="Puerto origen"
                    onChange={e => this.setState({srcPort: e.target.value})}
                    inputProps={{
                        'aria-label': 'Puerto origen',
                    }}
                    value={this.state.srcPort}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={e => this.setState({srcPort: ''})}
                            ><Icon>clear</Icon>
                            </IconButton>
                        </InputAdornment>
                    }
                />

                <Input
                    style={styles.input}
                    onChange={e => this.setState({dstPort: e.target.value})}
                    placeholder="Puerto destino"
                    inputProps={{
                        'aria-label': 'Puerto destino',
                    }}
                    value={this.state.dstPort}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={e => this.setState({dstPort: ''})}
                            ><Icon>clear</Icon>
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </Paper>

            <div>


            </div>

            <Paper style={{
                width: '100%',
                overflowX: 'auto'
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Zona origen</TableCell>
                            <TableCell>Zona destino</TableCell>
                            <TableCell>Origen</TableCell>
                            <TableCell>Destino</TableCell>
                            <TableCell>Puertos origen</TableCell>
                            <TableCell>Puertos destino</TableCell>
                            <TableCell>Acción</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => (
                            <TableRow style={n.enabled ? {} : {backgroundColor: 'lightgray',}} key={n.id}>
                                <TableCell component="th" scope="row">
                                    {n.metadata.ruleIndex}
                                </TableCell>
                                <TableCell>{n.name}</TableCell>
                                <TableCell>{this.renderZone(n.sourceZones)}</TableCell>
                                <TableCell>{this.renderZone(n.destinationZones)}</TableCell>
                                <TableCell>{this.renderNetworks(n.sourceNetworks)}</TableCell>
                                <TableCell>{this.renderNetworks(n.destinationNetworks)}</TableCell>
                                <TableCell>{this.renderPorts(n.sourcePorts)}</TableCell>
                                <TableCell>{this.renderPorts(n.destinationPorts)}</TableCell>
                                <TableCell style={n.action === 'ALLOW' ? {color: 'green'} : {color: 'red'}}>{n.action}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={data.length}
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
                />
            </Paper>
        </AppLayout>)
    }

    handleChangePage = (event, page) => {
        this.setState({page});
    };
}

const mapStateToProps = (state, ownProps) => {
    return {
        accessrules: state.accessrules.allIds,
        accessRulesById: state.accessrules.byId,
        hostsById: state.hosts.byId,
        networksById: state.networks.byId,
        rangesById: state.ranges.byId,
        networkgroupsById: state.networkgroups.byId,
        portobjectgroupsById: state.portobjectgroups.byId,
        protocolportobjectsById: state.protocolportobjects.byId,
        blank: (state.hosts.blank || state.accessrules.blank || state.networkgroups.blank
            || state.networks.blank || state.portobjectgroups.blank || state.ranges.blank ||
            state.protocolportobjects.blank),
        loading: (state.hosts.loading || state.accessrules.loading || state.networkgroups.loading
            || state.networks.loading || state.ranges.loading || state.portobjectgroups.loading
            || state.protocolportobjects.loading),

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


export default connect(mapStateToProps, mapDispatchToProps)(RulesScreen);