import gql from 'graphql-tag';

export default gql`
query listProjects{
  ProjectList{
    __typename,
    project_id,
    projectKey,
    projectName,
    owner,
    description
  }
}`;
