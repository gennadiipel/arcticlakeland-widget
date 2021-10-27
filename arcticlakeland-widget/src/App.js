import logo from './logo.svg';
import './App.css';

import Header from './components/Header';
import React from 'react';

import APIService from './services/APIService';

class App extends React.Component {

  products;

  constructor() {
    super()
    this.productsService = new APIService()
  }
  
  render() {
    
    return (
      <div className="widget-container">
        <Header></Header>
      </div>
    )
  }


  componentDidMount() {
    
  }
}

export default App;
