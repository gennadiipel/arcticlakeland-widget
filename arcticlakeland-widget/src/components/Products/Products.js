import React from "react";
import APIService from "../../services/APIService";
import preloader from "./../../assets/preloader.gif";

export default class Products extends React.Component {

    constructor() {
        super()

        this.apiService = new APIService()

        this.page = 1
        this.state = {products: []}
        this.isLoaded = false
        this.currentCategoryId = 0
    }
    
    render() {

        let products = 
        (!this.isLoaded) ?
        this.state.products.map(p => <p key={p.id}>{p.title.rendered}</p>) :
        <img src={preloader} className="preloader-image"></img>;

        return (
            <div className="products-container">
                {products}
            </div>
        )
    }


    reloadProducts() {
        this.isLoaded = false
        this.apiService.getProducts(this.currentCategoryId, products => {
            this.setState({products})
            this.isLoaded = true
        })
    }


    componentDidUpdate() {
        if (this.currentCategoryId != this.props.currentCategoryId) {
            this.currentCategoryId = this.props.currentCategoryId
            this.reloadProducts()
        }
    }
}