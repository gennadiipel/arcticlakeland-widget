import React from "react";

import preloader from './../assets/preloader.gif'

import APIService from "../services/APIService";
import CategoryChips from "./CategoryChips";

class Header extends React.Component {

    constructor() {
        super()

        this.apiService = new APIService()

        // currentlyActiveId is used to store which category is currently selected
        // categories is an originaly loaded categories
        // sortedCategories is a result of sort by parent category

        this.state = { categories: [], sortedCategories: [], currentlyActiveId: -1 }

        this.isLoaded = false;
    }

    render() {

        // show either preloader or categories
        // we pass name, id and currentlyActiveId to category item component
        let categories = (this.isLoaded) ?
            this.state.sortedCategories.map(c => (
                <CategoryChips clickHandler={this.handleClick.bind(this)} name={c.name} id={c.id} key={c.id} currentlyActive={this.state.currentlyActiveId}></CategoryChips>
            )) :
            <img className="preloader-image" src={preloader} alt='Loading...'></img>;

        return (
            <header>
                <div className="main-catergories-container">
                    <a onClick={() => this.openParentCategory(30)}>Majoitu</a>
                    <a onClick={() => this.openParentCategory(28)}>Näe ja koe</a>
                    <a onClick={() => this.openParentCategory(32)}>Syö ja juo</a>
                </div>
                <div className="categories-container">
                    {categories}
                </div>
            </header>
        )
    }

    openParentCategory(id) {
        const sortedCategories = this.state.categories.filter(c => c.parent === id)

        console.log(sortedCategories)
        this.setState({sortedCategories})
    }


    handleClick(currentlyActiveId) {
        this.setState({ currentlyActiveId })

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