import React, {Component} from 'react';
import {Mutation, withApollo} from 'react-apollo';
import CreateProjectQuery from '../../Queries/CreateProjectQuery';
import ListProjectsQuery from '../../Queries/ListProjectsQuery';
import uuidv4 from 'uuid/v4';

class NewProject extends Component {

    state = {
        projectName: '',
        nameConflict: false,
        projectKey: '',
        keyConflict: false,
        owner: 'xohotech',
        description: '',
        disableButton: true
    };

    mutationHandler = (createProjectMutation) => {
        let autoId = uuidv4();
        let variables = {
            id: autoId,
            name: this.state.projectName,
            key: this.state.projectKey,
            owner: this.state.owner
        };
        if (this.state.description.length > 0) {
            variables.description = this.state.description
        }
        createProjectMutation({
            variables: variables,
            optimisticResponse: {
                __typename: "Mutation",
                createProject: {
                    __typename: "Project",
                    project_id: autoId,
                    projectKey: this.state.projectKey,
                    projectName: this.state.projectName,
                    owner: this.state.owner,
                    description: this.state.description
                }
            }
        })
            .then(this.props.history.push('/projects'))

    };


    updateProjectsCache = (cache, {data: {createProject}}) => {
        const query = ListProjectsQuery;
        const projectsData = cache.readQuery({query});
        const data = {
            ProjectList: [
                ...projectsData.ProjectList,
                createProject
            ]
        };
        cache.writeQuery({query, data});
    };

    render() {
        let invalidInputs = this.state.nameConflict || this.state.keyConflict
            || this.state.projectName.length === 0 || this.state.projectKey.length === 0;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-5">
                        <form>
                            <p className="h4 text-center mb-3">Create New Project</p>
                            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Project Name</label>
                            <input type="text" id="defaultFormRegisterNameEx"
                                   className="form-control"
                                   maxLength="62"
                                   onChange={event => {
                                       const query = ListProjectsQuery;
                                       const projectsData = this.props.client.readQuery({query});
                                       let found = false;
                                       projectsData.ProjectList.forEach(project => {
                                           if (project.projectName.toLowerCase() === event.target.value.toLowerCase())
                                               found = true;
                                       });
                                       this.setState({nameConflict: found});
                                       if (!this.state.nameConflict)
                                           this.setState({projectName: event.target.value})
                                   }}/>
                            {this.state.nameConflict ?
                                <label className="text-danger">Another Project already has this
                                    name<br/></label> : null}
                            <br/>
                            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Project Key</label>
                            <input type="text" id="defaultFormRegisterNameEx"
                                   onChange={event => {
                                       const query = ListProjectsQuery;
                                       const projectsData = this.props.client.readQuery({query});
                                       let found = false;
                                       projectsData.ProjectList.forEach(project => {
                                           if (project.projectKey.toLowerCase() === event.target.value.toLowerCase())
                                               found = true;
                                       });
                                       this.setState({keyConflict: found});
                                       if (!this.state.keyConflict)
                                           this.setState({projectKey: event.target.value})
                                   }}
                                   className="form-control"
                                   maxLength="62"/>

                            {this.state.keyConflict ?
                                <label className="text-danger">Another Project already has this Key<br/></label> : null}
                            <br/>
                            <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">Owner</label>
                            <select className="form-control"
                                    onChange={event => this.setState({owner: event.target.value})}
                                    defaultValue="xohotech">
                                <option value="xohotech">xohotech</option>
                            </select>
                            <br/>
                            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Description</label>
                            <input type="text" id="defaultFormRegisterNameEx"
                                   onChange={event => this.setState({description: event.target.value})}
                                   className="form-control"
                                   maxLength="62"/>
                            <br/>
                        </form>
                        <Mutation mutation={CreateProjectQuery}
                                  update={this.updateProjectsCache}
                                  refetchQueries={[{query: ListProjectsQuery}]}
                        >
                            {mutation => (
                                <button className="btn-primary btn" disabled={invalidInputs}
                                        onClick={() => this.mutationHandler(mutation)}>
                                    Create
                                </button>
                            )}
                        </Mutation>
                        {invalidInputs ? <label className="text-info ml-3">Enter a unique name and key</label> : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default withApollo(NewProject);