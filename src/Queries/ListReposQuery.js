import gql from "graphql-tag";

export default gql`
query listAll{
  repoList{
    __typename
        id,
    repoName,
    project,
    language
  }
}`;