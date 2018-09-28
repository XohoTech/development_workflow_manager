import React, {Component} from "react";
import ProjectList from "../../Components/Projects/ProjectList";
import ListProjectsQuery from "../../Queries/ListProjectsQuery";
import {Query, withApollo} from "react-apollo";

class Projects extends Component {

	render() {
		return (
			<div>
				<Query query={ListProjectsQuery}>
					{result =>
						result.loading ?
							<p className="mb-5">Loading...</p> :
							<ProjectList history={this.props.history} projectList={result.data.ProjectList} refetch={result.refetch}/>
					}
				</Query>
			</div>
		);
	}
}

export default withApollo(Projects);