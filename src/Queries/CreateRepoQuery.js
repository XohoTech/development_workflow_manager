import gql from "graphql-tag";


export default gql`mutation newRepo($repoName: String!, $owner: String, 
$language: String, $project: String){
  createNewRepo(repoName: $repoName,
    language: $language, owner:$owner, project: $project){
    repoName,
    project,
    owner,
    language
  }
}`;
