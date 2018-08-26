import React, { Component } from 'react';
import { Input, Grid, Dropdown, Divider, Button } from 'semantic-ui-react';
import { ProjectOptions } from './projs';
import { connect } from 'react-redux';

import NavBar from '../components/NavBar';
import RouteBuilder from '../helpers/RouteBuilder';
import Actions from '../reducers/Actions';

const addUsertoProject = (userAdd, projAdd) => {
    fetch(RouteBuilder.route('/UserAdd'), {
        method: 'POST',
        body: JSON.stringify({ userAdd, projAdd }),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(response => {
        if (response.status === 200) {
            // return response.json();
            console.log('oh puppy it works');
        }
        return null;
    });
};

export class addUsers extends Component {
    render() {
        const {
            userAdd,
            projectAdd,
            setuserAdd,
            setprojectAdd
        } = this.props.submitUser;
        return (<div>
            <NavBar/>
            <h3> Add users </h3>
            <Divider horizontal/>
            <Divider horizontal/>
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Grid columns = '3'>
                            <Grid.Column width = '3'>
                                <Grid.Row>
                                    <Dropdown placeholder = 'Select Project'
                                        onChange={(event, data) => setprojectAdd(data.value)}
                                        selection options={ProjectOptions} />
                                </Grid.Row>
                            </Grid.Column>
                            <Divider vertical/>
                            <Grid.Column>
                                <Grid.Row>
                                    <Input
                                        onChange={setuserAdd}
                                        iconPosition='left'
                                        icon='user'
                                        fluid placeholder={"Add the user's username"}
                                    />
                                    <Divider horizontal/>
                                </Grid.Row>
                            </Grid.Column>
                            <Grid.Column>
                                <Button
                                    onClick={() => addUsertoProject(userAdd, projectAdd)}
                                >
                                    Add User </Button>
                            </Grid.Column>
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
        );
    }
}

export function mapStateToProps(state) {
    return {
        submitUser: {
            userAdd: state.submitUser.userAdd,
            projectAdd: state.submitUser.projectAdd
        }
    };
}

export function mapDispatchToProps(dispatch) {
    return {
        submitUser: {
            setuserAdd: event => {
                const action = {
                    type: Actions.submitUser.setuserAdd,
                    value: event.target.value
                };
                dispatch(action);
            },
            setprojectAdd: project => {
                const action = {
                    type: Actions.submitUser.setprojectAdd,
                    value: project
                };

                dispatch(action);
            }
        }
    };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    return Object.assign({}, ownProps, {
        submitUser: Object.assign({}, stateProps.submitUser, dispatchProps.submitUser)
    });
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(addUsers);
