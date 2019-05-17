import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from "react-redux";

const PrivateRouteComponent = ({component: Component, loggedIn, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props => {
                return ((loggedIn) ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
                ))
            }
            }
        />
    )
};

const mapStateToProps = (state, ownProps) => {
    return {
        loggedIn: state.authentication.loggedIn,
    }
};

const PrivateRoute = connect(mapStateToProps, null)(PrivateRouteComponent);

export default PrivateRoute;
