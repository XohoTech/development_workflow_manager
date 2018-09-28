import React, {Component} from 'react';
import {Collapse, CardBody, Card, CardHeader} from 'reactstrap';
import {Mutation} from 'react-apollo';
import DeleteRepoQuery from '../../Queries/DeleteRepoQuery';
import ListReposQuery from "../../Queries/ListReposQuery";


class RepoList extends Component {
    constructor(props) {
        super(props);
        // this.toggle = this.toggle.bind(this);
        this.state = {collapse: -1, repos: props.repoList};
    }

    toggleRepo = (e) => {
        let event = e.target.dataset.event;
        this.setState({collapse: this.state.collapse === Number(event) ? -1 : Number(event)});
    };

    render() {
        const {repos, collapse} = this.state;
        return (
            <div className="container">
                <label className="h4 page-header mb-3">Repositories</label>
                <button className="btn-primary ml-3" onClick={this.props.refetch}>Referesh</button>
                {repos.map((repo, index) => {
                        return (
                            <Card style={{marginBottom: '1rem', width: '60%'}} key={repo.id}>
                                <CardHeader onClick={this.toggleRepo} data-event={index}>{repo.repoName}</CardHeader>
                                <Collapse isOpen={collapse === index}>
                                    <CardBody>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-5">
                                                    <label className="text-primary">Owner: </label>
                                                    <label className="text-info ml-sm-3">{repo.project}</label>
                                                    <br/>
                                                    <label className="text-primary">Language: </label>
                                                    <label className="text-info ml-sm-3">{repo.owner}</label>
                                                    <br/>
                                                    <label className="text-primary">Language: </label>
                                                    <label className="text-info ml-sm-3">{repo.language.charAt(0).toUpperCase().concat(repo.language.substring(1,repo.language.length))}</label>
                                                </div>
                                                <div className="col-7">
                                                    <Mutation mutation={DeleteRepoQuery} variables={{id: repo.id}}
                                                              refetchQueries={[{query: ListReposQuery}]}>
                                                        {deleteRepo =>
                                                            <button className="float-right btn-dark"
                                                                    onClick={deleteRepo}>
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

export default RepoList;
