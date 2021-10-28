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
            isLoadingMore: false,// are we loading more products at the moment,
            count: 0, // count of products in category
        }

        this.currentCategoryId = 0
    }

    render() {

        // show either all products or a preloader
        let products =
            (this.state.isLoaded) ?
                this.state.products.map((product, id) => <Product product={product} key={id}></Product>) :
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
                    {(this.state.isLoaded && this.state.count > this.state.products.length) && button}
                </div>
            </div>

        )
    }


    reloadProducts() {
        this.setState({ isLoaded: false, isLoadingMore: true })

        // load all products from current category
        this.apiService.getProducts(this.currentCategoryId, products => {
            this.setState({ products, isLoaded: true, isLoadingMore: false })
        })
    }


    componentDidUpdate() {
        // When we get a new categoryId from the App component...

        if (this.currentCategoryId !== this.props.currentCategoryId) {
            this.currentCategoryId = this.props.currentCategoryId

            // ... we reload new products ...
            this.reloadProducts()

            // ... and reset current page.
            this.setState({ page: 1, count: this.props.count })

        }
    }

    loadMoreProducts() {

        // show preloader
        this.setState({
            isLoadingMore: true
        })

        this.apiService.getProducts(this.currentCategoryId, (p) => {

            // add new products to products list
            let products = this.state.products.concat(p)

            // increase page number
            this.setState({ isLoadingMore: false, page: this.state.page + 1, products })

        }, { page: this.state.page + 1 }, () => {
            this.setState({ isLoadingMore: false })
        })
    }
}