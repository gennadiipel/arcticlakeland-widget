import React from "react";
import APIService from "../../services/APIService";
import { Product } from "../Product/Product";
import preloader from "./../../assets/preloader.gif";

import './Products.scss';

export default class Products extends React.Component {

    constructor() {
        super()

        this.apiService = new APIService()


        this.state = {
            products: [],
            isLoaded: false, // are products loaded
            page: 1, // current page
            isLastPage: false, // is current page the last
            isLoadingMore: false // are we loading more products at the moment
        }

        this.currentCategoryId = 0
    }
    
    render() {

        // show either all products or a preloader
        let products = 
        (this.state.isLoaded) ?
        this.state.products.map(product => <Product product={product} key={product.id}></Product>) :
        <img src={preloader} className="preloader-image" alt="Loading..."></img>;

        const button = (
            <button 
            className={`load-more-button`}
            disabled={this.state.isLoadingMore}
            onClick={this.loadMoreProducts.bind(this)}>
                {this.state.isLoadingMore ? '...' : 'Lisää tuloksia'}
            </button>
        )

        return (
            <div className="content">
                <div className="products-container">
                    {products}
                    {(!this.state.products.length && this.state.isLoaded) && <p className="not-found-title">Tyhjä kategoria :(</p>}
                </div>
                <div className="load-more-container">
                    {(!this.state.isLastPage && this.state.isLoaded) && button}
                </div>
            </div>
            
        )
    }


    reloadProducts() {
        this.setState({isLoaded: false, isLoadingMore: true})

        // load all products from current category
        this.apiService.getProducts(this.currentCategoryId, products => {

            // if we loaded less than 10 products, then this is the last page
            let isLastPage = (products.length === 10) ? false : true

            this.setState({products, isLoaded: true, isLoadingMore: false, isLastPage})
        })
    }


    componentDidUpdate() {

        // When we get a new categoryId from the App component...

        if (this.currentCategoryId !== this.props.currentCategoryId) {
            this.currentCategoryId = this.props.currentCategoryId
            
            // ... we reload new products ...
            this.reloadProducts()

            // ... and reset current page.
            this.setState({page: 1})
        }
    }

    loadMoreProducts() {

        // show preloader
        this.setState({
            isLoadingMore: true
        })

        this.apiService.getProducts(this.currentCategoryId, (p) => {
            
            // if length of products is less than 10, this was the last page
            if (p.length < 10) {
                this.setState({isLastPage: true})
            } else {
                // add new products to products list
                let products = this.state.products.concat(p)

                this.setState({products})
            }

            // increase page number
            this.setState({isLoadingMore: false, page: this.state.page + 1})

        }, {page: this.state.page + 1}, () => {
            this.setState({isLastPage: true, isLoadingMore: false})
        })
    }
}