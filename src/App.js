import React from 'react';
import { withApollo } from 'react-apollo';
import { HashRouter, Route, Switch } from 'react-router-dom';
import MyContainer from './Containers/Dashboard/Container';
import './scss/style.css';
import '@coreui/icons/css/coreui-icons.min.css';

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" name="Home" component={MyContainer}/>
        </Switch>
      </HashRouter>
    );
  }
}

export default withApollo(App);
