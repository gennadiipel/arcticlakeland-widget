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
    this.state = {currentCategoryId: -1, countOfCategoryProducts: 0}
  }
  
  render() {
    
    return (
      <div className="widget-container">
        <Header categoryWasChanged={this.categoryWasChanged.bind(this)}></Header>
        <Products currentCategoryId={this.state.currentCategoryId} count={this.state.countOfCategoryProducts}></Products>
      </div>
    )
  }

  categoryWasChanged(currentCategoryId, countOfCategoryProducts = 0) {
    // update current category id when we get it from the Header component

    console.log("CategoryWasChanged", countOfCategoryProducts)

    this.setState({currentCategoryId, countOfCategoryProducts})
  }

}

export default App;
