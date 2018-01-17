import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Interface from './interface';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Interface />, document.getElementById('root'));
registerServiceWorker();
