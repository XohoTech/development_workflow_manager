import React, { Component } from 'react';
import {
  Card, CardBody, CardHeader, Collapse
} from 'reactstrap';
import { Mutation, withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import DeleteProjectQuery from '../../Queries/DeleteProjectQuery';
import ListProjectsQuery from '../../Queries/ListProjectsQuery';


class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: -1,
      projects: props.projectList
    };
  }

  toggleRepo = (e) => {
    const event = e.target.dataset.event;
    this.setState({ collapse: this.state.collapse === Number(event) ? -1 : Number(event) });
  };


  updateProjectsCache = (cache, { data: { deleteProject: { project_id } } }) => {
    const query = ListProjectsQuery;
    const projectsData = cache.readQuery({ query });
    console.log('before query, ', projectsData);
    const data = {
      ProjectList: [
        ...projectsData.ProjectList.filter(project => project.project_id !== project_id)
      ]
    };

    console.log('Concactenation, ', data);

    cache.writeQuery({
      query,
      data
    });
    console.log('After Query', cache.readQuery({ query }));
  };

  handleDelete = (deleteMutation) => {
    deleteMutation();
    this.setState({ collapse: -1 });
    this.props.refetch();
  };

  render() {
    const { projects, collapse } = this.state;

    if (!projects) return <h3>No Projets</h3>;

    return (
      <div className="container">
        <label className="h4 page-header mb-3">Projects</label>
        <button
          className="float-right btn-dark btn px-5 py-2"
          onClick={() => {
            this.props.history.push('/newProject');
          }}
        >
          Add
        </button>

        {projects.map((project, index) => (
          <Card
            style={{
              marginBottom: '1rem',
              width: '60%'
            }}
            key={project.project_id}
          >
            <CardHeader
              onClick={this.toggleRepo}
              data-event={index}
            >
              {project.projectName}
            </CardHeader>
            <Collapse isOpen={collapse === index}>
              <CardBody>
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <label className="text-primary">Key: </label>
                      <label className="text-info ml-sm-3">{project.projectKey}</label>
                      <br/>
                      <label className="text-primary">Owner: </label>
                      <label className="text-info ml-sm-3">{project.owner}</label>
                      <br/>

                      {project.description && project.description.length > 0
                        ? (
                          <span>
                            <label className="text-primary">Description: </label>
                            <label className="text-info ml-sm-3">{project.description}</label>
                          </span>
                        )
                        : null}
                      <button
                        className="float-right btn btn-dark ml-3"
                        onClick={
                          () => this.props.history.push({
                            pathname: '/newProject',
                            state: {
                              ...project,
                              action: 'UPDATE'
                            }
                          })
                        }
                      >
                        Update
                      </button>

                      <Mutation
                        mutation={DeleteProjectQuery}
                        key={project.project_id}
                        variables={{ id: project.project_id }}
                        refetchQueries={[{ query: ListProjectsQuery }]}
                        update={this.updateProjectsCache}
                        optimisticResponse={{
                          __typename: 'Mutation',
                          deleteProject: {
                            __typename: 'Project',
                            project_id: project.project_id,
                            projectKey: project.projectKey,
                            projectName: project.projectName,
                            owner: project.owner,
                            description: project.description
                          }
                        }}
                      >
                        {deleteProject => (
                          <button
                            className="float-right btn btn-dark"
                            onClick={() => this.handleDelete(deleteProject)}
                          >
                            Delete
                          </button>
                        )}
                      </Mutation>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Collapse>
          </Card>))}
      </div>
    );
  }
}

export default withApollo(withRouter(ProjectList));
