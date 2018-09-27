import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import CreateProjectQuery from '../../Queries/CreateProjectQuery';
import ListProjectsQuery from '../../Queries/ListProjectsQuery';

class NewProject extends Component {

    state = {
        projectName: '',
        owner: 'xohotech',
        language: 'java'
    };

    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-5">
                        <form>
                            <p className="h4 text-center mb-3">Create New Project</p>
                            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Project Name</label>
                            <input type="text" id="defaultFormRegisterNameEx"
                                   onChange={event => this.setState({projectName: event.target.value})}
                                   className="form-control"
                                   maxLength="62"/>
                            <br/>
                            <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">Owner</label>
                            <select className="form-control"
                                    onChange={event => this.setState({owner: event.target.value})}
                                    defaultValue="xohotech">
                                <option value="xohotech">xohotech</option>
                            </select>
                            <br/>
                            <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">Language</label>
                            <select defaultValue="java" className="form-control"
                                    onChange={event => this.setState({language: event.target.value})}>
                                <option value="java">Java</option>
                                <option value="c">C</option>
                                <option value="c#">C#</option>
                                <option value="c++">C++</option>
                                <option value="go">Go</option>
                                <option value="html/css">HTML/CSS</option>
                                <option value="javascript">JavaScript</option>
                                <option value="objective-c">Objective-C</option>
                                <option value="perl">Perl</option>
                                <option value="php">PHP</option>
                                <option value="python">Python</option>
                                <option value="ruby">Ruby</option>
                                <option value="swift">Swift</option>
                            </select>
                            <br/>
                        </form>
                        <Mutation mutation={CreateProjectQuery} variables={{
                            name: this.state.projectName,
                            owner: this.state.owner, language: this.state.language
                        }}
                        refetchQueries={[{query: ListProjectsQuery}]}>
                            {createProject => <button className="btn-primary" onClick={createProject}>Create</button> }
                        </Mutation>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewProject;