import React, {Component} from 'react';
import {Collapse, CardBody, Card, CardHeader} from 'reactstrap';

class RepoList extends Component {
    constructor(props) {
        super(props);
        // this.toggle = this.toggle.bind(this);
        this.state = {collapse: 0, cards: [1, 2, 3, 4, 5]};
    }

    toggleRepo = (e) => {
        let event = e.target.dataset.event;
        this.setState({collapse: this.state.collapse === Number(event) ? 0 : Number(event)});
    };

    render() {
        const {cards, collapse} = this.state;
        return (
            <div className="container">
                <h4 className="h4 page-header text-md-center mb-5">Repositories</h4>
                {cards.map(index => {
                        return (
                            <Card style={{marginBottom: '1rem'}} key={index}>
                                <CardHeader onClick={this.toggleRepo} data-event={index}>Header</CardHeader>
                                <Collapse isOpen={collapse === index}>
                                    <CardBody>
                                        Repo Description Line 1
                                        Repo Description Line 2
                                        Repo Description Line 3
                                        Repo Description Line 4
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
