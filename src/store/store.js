import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import RootReducer from './RootReducers';

const config = {
  key: 'react-hello',
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const reducer = persistReducer(config, RootReducer);
const middleware = applyMiddleware(thunk);

export default data => {
  const store = createStore(reducer, data, middleware);
  const persistor = persistStore(store);
  return { persistor, store };
};
