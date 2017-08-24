import React from 'react';
import logo from '../logo.svg';

import { TaskList } from './TaskList';

export const Home = () => {
    return (
        <div>
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Welcome to TaskManager</h2>
            </div>
            <div className="App-intro">
                <TaskList />
            </div>
        </div>
    );
};
