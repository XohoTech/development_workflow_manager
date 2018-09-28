import gql from "graphql-tag";

export default gql`
mutation deleteRepo($id: ID!){
  deleteRepo(id: $id){
    id,
    repoName,
    project,
    language,
    owner
  }
}
`;