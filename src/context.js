import React from 'react';

const ctx = React.createContext('counter');
export const {Provider, Consumer} = ctx;
export const withCounter = Component => props => <Consumer>{value => <Component {...props} counter={value} />}</Consumer>;

export default ctx;