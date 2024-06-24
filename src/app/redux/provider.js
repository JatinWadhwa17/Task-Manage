"use client";
import React from 'react';
import { Provider } from "react-redux";
// import { PersistGate } from 'redux-persist/integration/react';
import store from './store';

const Prvider = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export default Prvider;