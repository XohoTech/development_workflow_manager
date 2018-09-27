import gql from 'graphql-tag';

export default gql`
query getProject($id: ID!){
  Project(project_id: $id){
    project_id,
    projectName,
    owner,
    language
  }
}
`;