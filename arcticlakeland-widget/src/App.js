import './App.css';

import Header from './components/Header';
import React from 'react';

import APIService from './services/APIService';
import Products from './components/Products';

class App extends React.Component {

  products;

  constructor() {
    super()
    this.productsService = new APIService()

    this.state = {currentCategoryId: -1}
  }
  
  render() {
    
    return (
      <div className="widget-container">
        <Header categoryWasChanged={this.categoryWasChanged.bind(this)}></Header>
        <Products currentCategoryId={this.state.currentCategoryId}></Products>
      </div>
    )
  }


  componentDidMount() {
    
  }

  categoryWasChanged(currentCategoryId) {
    this.setState({currentCategoryId})
  }

}

export default App;
