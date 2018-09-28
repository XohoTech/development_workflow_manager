import gql from "graphql-tag";

export default gql`
query getProject($id: ID!){
  Project(project_id: $id){
     __typename,
    project_id,
    projectName,
    owner,
    language
  }
}
`;