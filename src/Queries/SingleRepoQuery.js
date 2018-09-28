import gql from "graphql-tag";

export default gql`
query SingleRepoQuery{
  singleRepo(id: "0b6e63a0-19b1-4dd4-8987-5b1cff5c95c0"){
    id,
    repoName,
    project,
    language
  }
}`;