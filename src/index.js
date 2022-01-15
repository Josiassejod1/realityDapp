import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThirdwebWeb3Provider } from '@3rdweb/hooks';
import App from './App';
//import * as serviceWorker from './serviceWorker';

// Put the ethereum chain ids of the chains you want to support
const supportedChainIds = [1, 4, 137];

const connectors = {
  injected: {},
};


ReactDOM.render(<React.StrictMode>
    <ThirdwebWeb3Provider
        connectors={connectors}
        supportChainIds={supportedChainIds}
    >
        <App />
    </ThirdwebWeb3Provider>
</React.StrictMode>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
