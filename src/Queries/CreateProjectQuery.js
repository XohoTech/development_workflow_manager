import gql from 'graphql-tag'

export default gql`mutation newProject($name: String!, $owner: String, $language: String){
  createProject(projectName: $name,
  owner: $owner, language: $language)
  {
    project_id,
    projectName,
    owner,
    language
  }
}`;