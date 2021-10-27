import React from "react";

import preloader from './../assets/preloader.gif'

import APIService from "../services/APIService";
import CategoryChips from "./CategoryChips";

class Header extends React.Component {
    
    constructor() {
        super()

        this.apiService = new APIService()

        // currentlyActiveId is used to store which category is currently selected

        this.state = {categories: [], currentlyActiveId: -1}

        this.isLoaded = false;
    }
    
    render() {

        // show either preloader or categories
        // we pass name, id and currentlyActiveId to category item component
        let categories = (this.isLoaded) ? 
        this.state.categories.map(c => (
            <CategoryChips clickHandler={this.handleClick.bind(this)} name={c.name} id={c.id} key={c.id} currentlyActive={this.state.currentlyActiveId}></CategoryChips>
            )) : 
        <img className="preloader-image" src={preloader} alt='Loading...'></img>;

        return (
            <div className="categories-container">
                {categories}
            </div>
        )
    }

    handleClick(currentlyActiveId) {
        this.setState({currentlyActiveId})

        this.props.categoryWasChanged(currentlyActiveId)
    }


    componentDidMount() {
        this.apiService.getCategories((categories) => {

            // set isLoaded flag to `true`to hide preloader
            this.isLoaded = true

            // by default we open first category
            // if array is empty we use -1
            let currentlyActiveId = categories[0]?.id || -1

            // load products from default category
            this.props.categoryWasChanged(currentlyActiveId)

            this.setState({
                categories,
                currentlyActiveId 
            })
        })
    }
}

export default Header