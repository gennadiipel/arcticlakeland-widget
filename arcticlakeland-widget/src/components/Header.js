import React from "react";

import preloader from './../assets/preloader.gif'

import APIService from "../services/APIService";
import CategoryChips from "./CategoryChips";

class Header extends React.Component {
    
    constructor() {
        super()

        this.apiService = new APIService()
        this.state = {categories: []}

        this.isLoaded = false;
    }
    
    render() {

        let categories = (this.isLoaded) ? this.state.categories.map(c => <CategoryChips name={c.name}></CategoryChips>) : <img className="preloader-image" src={preloader}></img>;

        return (
            <div className="categories-container">
                {categories}
            </div>
        )
    }


    componentDidMount() {
        this.apiService.getCategories((categories) => {

            this.isLoaded = true

            this.setState({
                categories
            })
        })
    }
}

export default Header