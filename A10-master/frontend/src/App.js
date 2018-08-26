import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers/reducers';
import StoryBoard from './pages/StoryBoard';
import addUsers from './pages/addUsers';

import './App.css';
import './user.js';

class App extends Component {
    constructor() {
        super();

        const store = createStore(reducers);

        this.state = {
            store
        };

        store.subscribe(() => {
            console.log('store.getState()', store.getState());
        });
    }


    render() {
        return (
            <Provider store={this.state.store}>
                <div className='App'>
                    <BrowserRouter className='router'>
                        <Switch>
                            <Route exact path='/storyBoard' component={StoryBoard}/>
                            <Route exact path='/addUsers' component={addUsers}/>
                        </Switch>
                    </BrowserRouter>
                </div>
            </Provider>
        );
    }
}

export default App;
