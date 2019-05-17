import React from 'react';

import { connect } from 'react-redux';
import {logout} from '../store/actions/authActions';
import {bindActionCreators} from "redux";
import {history} from '../services/history';


class LogoutScreen extends React.Component {

  componentWillMount() {
      this.props.logout();
      history.push('/login');
  }

  render() {
    return 'Logging out...';
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(LogoutScreen);
