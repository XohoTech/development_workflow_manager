import React, { Component } from 'react';
import { Query, withApollo } from 'react-apollo';
import ProjectList from '../../Components/Projects/ProjectList';
import ListProjectsQuery from '../../Queries/ListProjectsQuery';

class Projects extends Component {
  render() {
    return (
      <div>
        <Query query={ListProjectsQuery}>
          {result => (result.loading
            ? <p className="mb-5">Loading...</p>
            : <ProjectList projectList={result.data.ProjectList} refetch={result.refetch}/>)
          }
        </Query>
      </div>
    );
  }
}

export default withApollo(Projects);
