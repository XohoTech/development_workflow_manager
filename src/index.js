import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Config from './AppSync';
import Client from 'aws-appsync';
import {ApolloProvider} from 'react-apollo';
import {Rehydrated} from 'aws-appsync-react';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

const client = new Client({
    url: Config.graphqlEndpoint,
    region: Config.region,
    auth: {
        type: Config.authenticationType,
        apiKey: Config.apiKey
    }
});


ReactDOM.render(<ApolloProvider client={client}>
        <Rehydrated>
            <App/>
        </Rehydrated>
    </ApolloProvider>
    , document.getElementById('root'));
registerServiceWorker();
