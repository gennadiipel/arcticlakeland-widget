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
        this.state = {products: [], isLoaded: false, page: 1, isLastPage: false, isLoadingMore: false}
        this.currentCategoryId = 0
    }
    
    render() {

        let products = 
        (this.state.isLoaded) ?
        this.state.products.map(product => <Product product={product} key={product.id}></Product>) :
        <img src={preloader} className="preloader-image"></img>;

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
        this.apiService.getProducts(this.currentCategoryId, products => {

            let isLastPage = (products.length == 10) ? false : true

            this.setState({products, isLoaded: true, isLoadingMore: false, isLastPage})
        })
    }


    componentDidUpdate() {
        if (this.currentCategoryId != this.props.currentCategoryId) {
            this.currentCategoryId = this.props.currentCategoryId
            this.reloadProducts()

            this.setState({page: 1})
        }
    }

    loadMoreProducts() {

        this.setState({
            isLoadingMore: true
        })

        this.apiService.getProducts(this.currentCategoryId, (p) => {
            
            if (p.length < 10) {
                this.setState({isLastPage: true})
            } else {
                let products = this.state.products.concat(p)

                this.setState({products})
            }

            this.setState({isLoadingMore: false, page: this.state.page + 1})

        }, {page: this.state.page + 1}, () => {
            this.setState({isLastPage: true, isLoadingMore: false})
        })
    }
}