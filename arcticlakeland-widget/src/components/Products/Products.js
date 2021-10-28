import React from "react";
import APIService from "../../services/APIService";
import { Product } from "../Product/Product";
import preloader from "./../../assets/preloader.gif";

import './Products.scss';

export default class Products extends React.Component {

    constructor() {
        super()

        this.apiService = new APIService()

        this.page = 1
        this.state = {products: [], isLoaded: false}
        this.currentCategoryId = 0
    }
    
    render() {

        let products = 
        (this.state.isLoaded) ?
        this.state.products.map(product => <Product product={product} key={product.id}></Product>) :
        <img src={preloader} className="preloader-image"></img>;

        return (
            <div className="products-container">
                {products}
            </div>
        )
    }


    reloadProducts() {
        this.setState({isLoaded: false})
        this.apiService.getProducts(this.currentCategoryId, products => {
            this.setState({products, isLoaded: true})
        })
    }


    componentDidUpdate() {
        if (this.currentCategoryId != this.props.currentCategoryId) {
            this.currentCategoryId = this.props.currentCategoryId
            this.reloadProducts()
        }
    }
}