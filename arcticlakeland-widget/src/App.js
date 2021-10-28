import './App.css';

import Header from './components/Header/Header';
import React from 'react';

import APIService from './services/APIService';
import Products from './components/Products/Products';

class App extends React.Component {

  products;

  constructor() {
    super()
    this.productsService = new APIService()

    // current selected category
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

  categoryWasChanged(currentCategoryId) {
    // update current category id when we get it from the Header component
    this.setState({currentCategoryId})
  }

}

export default App;
