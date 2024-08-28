import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom'; // Import Link
import Update from './components/Update';
import Edit from './components/Edit';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        {/* Add Link to Update component */}
        <Link to="/update">Update</Link>

        {/* Define routes for Update and Edit components */}
        <Route path='/update' Component={Update} />
        <Route path='/edit'  Component={Edit} />
      </BrowserRouter>
    </div>
  )
}

export default App;
