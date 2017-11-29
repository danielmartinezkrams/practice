import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './js/App';
import registerServiceWorker from './js/registerServiceWorker';

import $ from 'jquery';
window.jQuery = $;
window.$ = $;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
