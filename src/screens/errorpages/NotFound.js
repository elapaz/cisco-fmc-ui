import React, { Component } from 'react';
import ShowError from '../../components/generics/ShowError';

export default class NotFound extends Component {
  render() {
    return <ShowError error="Error 404. La página solicitada no existe" />;
  }
}
