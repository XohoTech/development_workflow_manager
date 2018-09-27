import gql from 'graphql-tag';

export default gql`
mutation deleteProject($id: ID!){
    deleteProject(project_id: $id){
        project_id,
        projectName
    }
}
`;