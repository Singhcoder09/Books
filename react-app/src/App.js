import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import BookList from './BookList';
import BookEdit from './BookEdit';
import './App.css';

class App extends Component{
  render(){
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={BookList} />
          <Route path="/books/:id" component={BookEdit} />
        </Switch>
      </Router>
    )
  }
}

export default App;