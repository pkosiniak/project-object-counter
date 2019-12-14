import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import { colors } from './styles/colors';

const root = document.getElementById('root');

ReactDOM.render(<App />, root);

const body = document.getElementsByTagName('body')[0];
if (body) {
   body.style.overflow = 'hidden';
   body.style.backgroundColor = (colors.darker);
   body.style.margin = '0';
   body.style.height = '100vh';
}

if (root) {
   root.style.height = '100vh';
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
