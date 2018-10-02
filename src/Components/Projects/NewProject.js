import React, { Component } from 'react';
import { Mutation, withApollo } from 'react-apollo';
import uuidv4 from 'uuid/v4';
import { auto } from 'async';
import CreateProjectQuery from '../../Queries/CreateProjectQuery';
import ListProjectsQuery from '../../Queries/ListProjectsQuery';
import UpdateProjectQuery from '../../Queries/UpdateProjectQuery';

class NewProject extends Component {
  constructor(props) {
    super(props);
    // this.toggle = this.toggle.bind(this);
    this.state = {
      projectName: '',
      nameConflict: false,
      projectKey: '',
      keyConflict: false,
      owner: 'xohotech',
      description: '',
      disableButton: true,
      action: 'ADD'
    };
    if (this.props.location.state) {
      this.state = {
        ...this.state,
        ...this.props.location.state
      };
    }
  }

  mutationHandler = (createProjectMutation) => {
    const autoId = uuidv4();
    const variables = {
      id: autoId,
      name: this.state.projectName,
      key: this.state.projectKey,
      owner: this.state.owner
    };
    if (this.state.description.length > 0) {
      variables.description = this.state.description;
    }
    createProjectMutation({
      variables,
      optimisticResponse: {
        __typename: 'Mutation',
        createProject: {
          __typename: 'Project',
          project_id: autoId,
          projectKey: this.state.projectKey,
          projectName: this.state.projectName,
          owner: this.state.owner,
          description: this.state.description
        }
      }
    })
      .then(this.props.history.push({
        pathname: '/projects',
        state: {
          collapseId: autoId
        }
      }));
  };


  updateProjectsCache = (cache, { data: { createProject } }) => {
    const query = ListProjectsQuery;
    const projectsData = cache.readQuery({ query });
    const data = {
      ProjectList: [
        ...projectsData.ProjectList,
        createProject
      ]
    };
    cache.writeQuery({
      query,
      data
    });
  };

  updateProjectInCache = (cache, { data: { updateProject } }) => {
    const query = ListProjectsQuery;
    const projectsData = cache.readQuery({ query });
    const projectList = [...projectsData.ProjectList];
    const updateIndex = projectList.findIndex(project => project.id === updateProject.id);
    projectList[updateIndex] = { ...updateProject };
    const data = {
      ProjectList: [
        ...projectList
      ]
    };
    cache.writeQuery({
      query,
      data
    });
  };

  updateMutationHandler = (updateProjectMutation) => {
    const variables = {
      id: this.state.project_id,
      name: this.state.projectName,
      key: this.state.projectKey,
      owner: this.state.owner
    };

    if (this.state.description && this.state.description.length > 0) {
      variables.description = this.state.description;
    }

    updateProjectMutation({
      variables,
      optimisticResponse: {
        __typename: 'Mutation',
        updateProject: {
          __typename: 'Project',
          project_id: this.state.id,
          projectKey: this.state.projectKey,
          projectName: this.state.projectName,
          owner: this.state.owner,
          description: this.state.description
        }
      }
    })
      .then(this.props.history.push('/projects'));
  };

  render() {
    const mutationButton = this.state.action === 'ADD' ? (
      <Mutation
        mutation={CreateProjectQuery}
        update={this.updateProjectsCache}
        refetchQueries={[{ query: ListProjectsQuery }]}
      >
        {mutation => (
          <button
            className="btn-primary btn"
            disabled={invalidInputs}
            onClick={() => this.mutationHandler(mutation)}
          >
            Create


          </button>
        )}
      </Mutation>
    ) : (
      <Mutation
        mutation={UpdateProjectQuery}
        update={this.updateProjectsCache}
        refetchQueries={[{ query: ListProjectsQuery }]}
      >
        {mutation => (
          <button className="btn-primary btn" onClick={() => this.updateMutationHandler(mutation)}>
            Update


          </button>
        )}
      </Mutation>
    );


    let invalidInputs = this.state.nameConflict || this.state.keyConflict
      || this.state.projectName.length === 0 || this.state.projectKey.length === 0;

    return (
      <div className="container">
        <div className="row">
          <div className="col-5">
            <form>
              <p className="h4 text-center mb-3">Create New Project</p>
              <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Project Name</label>
              <input
                type="text"
                id="defaultFormRegisterNameEx"
                value={this.state.projectName}
                className="form-control"
                maxLength="62"
                onChange={(event) => {
                  const inputName = event.target.value;
                  const query = ListProjectsQuery;
                  const projectsData = this.props.client.readQuery({ query });
                  let found = false;
                  projectsData.ProjectList.forEach((project) => {
                    if (project.projectName.toLowerCase() === inputName.toLowerCase()) found = true;
                  });
                  if (this.state.action === 'UPDATE'
                    && inputName.toLowerCase() === this.props.location.state.projectName.toLowerCase()) {
                    found = false;
                  }
                  this.setState({ nameConflict: found });
                  if (!this.state.nameConflict) this.setState({ projectName: inputName });
                }}
              />
              {this.state.nameConflict
                ? (
                  <label className="text-danger">
                    Another Project already has this
                    name
                    <br/>
                  </label>
                ) : null}
              <br/>
              <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Project Key</label>
              <input
                type="text"
                id="defaultFormRegisterNameEx"
                value={this.state.projectKey}
                onChange={(event) => {
                  const inputKey = event.target.value;
                  const query = ListProjectsQuery;
                  const projectsData = this.props.client.readQuery({ query });
                  let found = false;
                  projectsData.ProjectList.forEach((project) => {
                    if (project.projectKey.toLowerCase() === inputKey.toLowerCase()) found = true;
                  });
                  if (this.state.action === 'UPDATE' && inputKey.toLowerCase() === this.props.location.state.projectKey.toLowerCase()) {
                    found = false;
                  }
                  this.setState({ keyConflict: found });
                  if (!this.state.keyConflict) this.setState({ projectKey: inputKey });
                }}
                className="form-control"
                maxLength="62"
              />

              {this.state.keyConflict
                ? (
                  <label className="text-danger">
                    Another Project already has this Key
                    <br/>
                  </label>
                ) : null}
              <br/>
              <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">Owner</label>
              <select
                className="form-control"
                onChange={event => this.setState({ owner: event.target.value })}
                defaultValue="xohotech"
              >
                <option value="xohotech">xohotech</option>
              </select>
              <br/>
              <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Description</label>
              <input
                type="text"
                id="defaultFormRegisterNameEx"
                value={this.state.description}
                onChange={event => this.setState({ description: event.target.value })}
                className="form-control"
                maxLength="62"
              />
              <br/>
            </form>
            {mutationButton}
            {invalidInputs
              ? <label className="text-info ml-3">Enter a unique name and key</label> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default withApollo(NewProject);
