import gql from 'graphql-tag'

export default gql`
query listProjects{
  ProjectList{
    project_id,
    projectName,
    owner,
    language
  }
}`;