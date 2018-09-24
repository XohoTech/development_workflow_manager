import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import CreateRepoQuery from '../Queries/CreateRepoQuery';
import '../App.css'

class DwmContainer extends Component {


    state = {
        repoName: '',
        owner: 'xohotech',
        project: 'DWM',
        accessControl: 'Private',
        language: 'java',
        versionControl: 'Git',
        repos: [{}]
    };

    mutationHandler = (propFunction, data) => {
        console.log(data);
        // propFun
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-5">
                        <form>
                            <p className="h4 text-center mb-3">Create New Repository</p>
                            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">Repository Name</label>
                            <input type="text" id="defaultFormRegisterNameEx"
                                   onChange={event => this.setState({repoName: event.target.value})}
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
                            <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">Project</label>
                            <select className="form-control"
                                    onChange={event => this.setState({project: event.target.value})}
                            defaultValue="DWMT">
                                <option value="DWMT">DWM Test</option>
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
                            <div className="text-center mt-4">
                                <Mutation mutation={CreateRepoQuery}
                                          variables={{
                                              repoName: this.state.repoName,
                                              owner: this.state.owner,
                                              language: this.state.language
                                          }}>
                                    {postMutation => <button className="btn btn-success" onClick={postMutation}>Create</button>}
                                </Mutation>
                            </div>
                        </form>
                    </div>
                    <div className="col-7">

                    </div>
                </div>
            </div>
        );
    }
}

export default DwmContainer;