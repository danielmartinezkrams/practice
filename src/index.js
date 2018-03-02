import React from 'react';
import ReactDOM from 'react-dom';
import './Style/index.css';
import App from './js/App';
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './js/registerServiceWorker';
import $ from 'jquery';
import history from './history'
window.jQuery = $;
window.$ = $;


ReactDOM.render(
    <BrowserRouter history={history}>
        <App />
    </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();
