import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './js/App';
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './js/registerServiceWorker';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;


ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();
