import gql from "graphql-tag";


export default gql`mutation newRepo($repoName: String!, $owner: String!, 
$language: String!){
  createNewRepo(repoName: $repoName,
    language: $language, owner:$owner){
    repoName,
    owner,
    language
  }
}`;