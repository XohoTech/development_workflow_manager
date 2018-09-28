import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import Config from "./AppSync";
import AWSAppSyncClient, {createAppSyncLink} from "aws-appsync";
import {ApolloProvider} from "react-apollo";
import {Rehydrated} from "aws-appsync-react";
import "bootstrap/dist/css/bootstrap.min.css";


import {ApolloLink} from "apollo-link";
import {InMemoryCache} from "apollo-cache-inmemory";
import {withClientState} from "apollo-link-state";

const cache = new InMemoryCache();

const stateLink = withClientState({
	cache
});

const client = new AWSAppSyncClient(
	{
		url: Config.graphqlEndpoint,
		region: Config.region,
		auth: {
			type: Config.authenticationType,
			apiKey: Config.apiKey
		}
	},
	{
		cache,
		link: ApolloLink.from([
			stateLink,
			createAppSyncLink({
				url: Config.graphqlEndpoint,
				region: Config.region,
				auth: {
					type: Config.authenticationType,
					apiKey: Config.apiKey
				}
			})
		])
	}
);

ReactDOM.render(<ApolloProvider client={client}>
	<Rehydrated>
		<App />
	</Rehydrated>
</ApolloProvider>
, document.getElementById("root"));
registerServiceWorker();
