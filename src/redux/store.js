import reducer from './reducers';
import {configureStore, applyMiddleware} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import ReactotronConfig from '../config/ReactotronConfig';

export default configureStore({
  reducer: reducer,
  middleware: [thunk],
  enhancers: [ReactotronConfig.createEnhancer()],
  devTools: true,
});
