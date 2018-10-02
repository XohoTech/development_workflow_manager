import React, { Component } from 'react';
import { Query } from 'react-apollo';
import RepoList from '../../Components/Repositories/RepoList';
import ListReposQuery from '../../Queries/ListReposQuery';

class Repositories extends Component {
  render() {
    return (
      <div>
        <Query query={ListReposQuery}>
          {result => (result.loading
            ? <p className="mb-5">Loading...</p>
            : <RepoList repoList={result.data.repoList} refetch={result.refetch}/>)
          }
        </Query>

      </div>
    );
  }
}

export default Repositories;
