import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Main_router from './Components/Main_router';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Main_router />, document.getElementById('root'));
registerServiceWorker();
