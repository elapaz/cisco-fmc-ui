import React from 'react';
import AppLayout from "../components/layout/AppLayout";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Moment from "react-moment";
import {fetchAudit, fetchAuditReset} from "../store/actions/auditActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Fab from "@material-ui/core/Fab";
import SyncIcon from '@material-ui/icons/Sync';

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
}

class AuditScreen extends React.Component {

    state = {
        search: '',
    }

    handleFetch = () => {
        this.props.fetchAudit();
    };

    handleReset = () => {
        this.props.fetchAuditReset();
    }

    render() {
        const {loading, error, data = []} = this.props;
        if (loading) {
            return (<AppLayout>
                <Paper>
                    <CircularProgress/>
                    <Button onClick={this.handleReset}>Cancelar</Button>
                </Paper>
            </AppLayout>);
        }
        if (error) {
            return (<AppLayout>
                <Paper>
                    Ocurrio un error al cargar los logs de auditoria.
                    <Button variant='contained' onClick={this.handleFetch}> Intentar nuevamente</Button>
                </Paper>
            </AppLayout>)
        }
        return (<AppLayout>
            <Paper elevation={1} style={styles.root}>

                <Input
                    style={styles.input}
                    placeholder="Buscar..."
                    onChange={e => this.setState({search: e.target.value})}
                    inputProps={{
                        'aria-label': 'Buscar...',
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

                <Fab color="primary" aria-label="Sync" onClick={this.handleFetch} size="small">
                    <SyncIcon/>
                </Fab>
            </Paper>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Hora</TableCell>
                            <TableCell>Usuario</TableCell>
                            <TableCell>Origen</TableCell>
                            <TableCell>Mensaje</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((n, idx) => (
                            <TableRow key={idx}>
                                <TableCell component="th" scope="row">
                                    <Moment unix format='DD/MM/Y hh:mm:ss'>{n.time}</Moment>
                                </TableCell>
                                <TableCell>{n.username}</TableCell>
                                <TableCell>{n.source}</TableCell>
                                <TableCell>{n.message}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table></Paper>
        </AppLayout>)
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            fetchAudit,
            fetchAuditReset,
        },
        dispatch,
    );

const mapStateToProps = (state, ownProps) => {
    const auditState = state.audit;
    return {
        ...auditState
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuditScreen);