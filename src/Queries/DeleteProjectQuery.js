import gql from "graphql-tag";

export default gql`
mutation deleteProject($id: ID!){
    deleteProject(project_id: $id){
        __typename,
        project_id,
        projectKey,
        projectName,
        owner,
        description
    }
}
`;