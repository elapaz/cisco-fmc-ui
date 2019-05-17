import React, { Component } from 'react';

import './App.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import createStore from './store/store';
import Main from './routers/Main';

const { persistor, store } = createStore();

const onBeforeLift = () => {};


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<p>Loading..</p>} onBeforeLift={onBeforeLift} persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
