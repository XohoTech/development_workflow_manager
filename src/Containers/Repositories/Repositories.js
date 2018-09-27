import React, {Component} from 'react'
import RepoList from '../../Components/Repositories/RepoList';
import ListReposQuery from '../../Queries/ListReposQuery';
import {Query} from 'react-apollo';

class Repositories extends Component {

    render() {
        return (
            <div>
                <Query query={ListReposQuery}>
                    {result =>
                        result.loading ?
                            <p className="mb-5">Loading...</p> :
                            <RepoList repoList={result.data.repoList} refetch={result.refetch}/>
                    }
                </Query>

            </div>
        )
    }
}

export default Repositories;