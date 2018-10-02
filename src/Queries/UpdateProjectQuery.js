import gql from 'graphql-tag';

export default gql`
mutation updateProject($id:ID!,$name: String!, $key: String!, $owner: String, $description: String){
  updateProject(project_id: $id, projectName: $name, projectKey: $key,
  owner: $owner, description: $description){
    __typename,
    project_id,
    projectName,
    projectKey,
    description,
    owner
  }
}
`;
