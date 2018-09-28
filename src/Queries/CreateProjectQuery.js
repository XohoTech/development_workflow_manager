import gql from "graphql-tag";

export default gql`mutation newProject($id:ID!, $name: String!, $key: String!, $owner: String, $description: String){
  createProject(projectName: $name, project_id: $id, projectKey: $key,
  owner: $owner, description: $description)
  {
    __typename,
    project_id,
    projectKey,
    projectName,
    owner,
    description
  }
}`;
