import React, {Component} from 'react';
import {Collapse, CardBody, Card, CardHeader} from 'reactstrap';
import {Mutation} from 'react-apollo';
import DeleteProjectQuery from '../../Queries/DeleteProjectQuery';
import ListProjectsQuery from "../../Queries/ListProjectsQuery";


class ProjectList extends Component {
    constructor(props) {
        super(props);
        // this.toggle = this.toggle.bind(this);
        this.state = {collapse: -1, projects: props.projectList};
    }

    toggleRepo = (e) => {
        let event = e.target.dataset.event;
        this.setState({collapse: this.state.collapse === Number(event) ? -1 : Number(event)});
    };

    render() {
        const {projects, collapse} = this.state;
        return (
            <div className="container">
                <label className="h4 page-header mb-3">Projects</label>
                {projects.map((project, index) => {
                        return (
                            <Card style={{marginBottom: '1rem', width: '60%'}} key={project.project_id}>
                                <CardHeader onClick={this.toggleRepo} data-event={index}>{project.projectName}</CardHeader>
                                <Collapse isOpen={collapse === index}>
                                    <CardBody>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-5">
                                                    <label className="text-primary">Owner: </label>
                                                    <label className="text-info ml-sm-3">{project.owner}</label>
                                                    <br/>
                                                    <label className="text-primary">Language: </label>
                                                    <label className="text-info ml-sm-3">{project.language}</label>
                                                </div>
                                                <div className="col-7">
                                                    <Mutation mutation={DeleteProjectQuery} variables={{id: project.project_id}}
                                                              refetchQueries={[{query: ListProjectsQuery}]}>
                                                        {deleteProject =>
                                                            <button className="float-right btn-dark"
                                                                    onClick={deleteProject}>
                                                                Delete
                                                            </button>
                                                        }
                                                    </Mutation>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Collapse>
                            </Card>)
                    }
                )}
            </div>
        );
    }
}

export default ProjectList;
