import React from "react";

import preloader from './../../assets/preloader.gif'

import APIService from "../../services/APIService";
import CategoryChips from "../CategoryChips/CategoryChips";

import './Header.scss';

class Header extends React.Component {

    constructor() {
        super()

        this.apiService = new APIService()

        this.state = {
            categories: [], // all categories
            sortedCategories: [], // categories of selected parent category
            currentlyActiveId: -1, // selected category
            currentlyActiveParentId: -1, // selected parent category
            isCategoryListExpanded: false, // is category list expanded
            isLoaded: false // are all categories loaded
        }

        // list of parent categories
        this.parentCategories = [
            { id: 30, title: 'Majoitu' },
            { id: 28, title: 'Näe ja koe' },
            { id: 32, title: 'Syö ja juo' },
        ]
    }

    render() {

        // displayed categories, that will be shown in the header: if list is expanded, then show all categories, otherwise only 10 first.
        let displayedCategories = !this.state.isCategoryListExpanded ? this.state.sortedCategories.slice(0, 10) : [...this.state.sortedCategories]

        // show either categories or preloader, is isLoaded === false
        let categories = (this.state.isLoaded) ?
            displayedCategories.map(c => (
                <CategoryChips clickHandler={this.handleClick.bind(this)} name={c.name} id={c.id} key={c.id} currentlyActive={this.state.currentlyActiveId}></CategoryChips>
            )) :
            <img className="preloader-image" src={preloader} alt='Loading...'></img>;

        // "expand" button if there more than 10 categories
        let expandButton = null

        if (this.state.sortedCategories.length > 10) {
            expandButton = (
                <div onClick={this.expandCategories.bind(this)} className="category-chips-item">
                    <span>{this.state.isCategoryListExpanded ? 'Hide' : `Show more (+${this.state.sortedCategories.length - 10})`}</span>
                </div>
            )
        }


        return (
            <header>
                <div className="parent-catergories-container centered-container">
                    {
                        this.parentCategories.map(el => {
                            return (
                                <a
                                    key={el.id}
                                    className={`parent-category-title ${this.state.currentlyActiveParentId === el.id ? 'active' : ''}`}
                                    onClick={() => this.openParentCategory(el.id)}
                                >
                                    {el.title}
                                </a>
                            )
                        })
                    }
                </div>
                <div className="categories-container centered-container">
                    {categories}
                    {expandButton}
                </div>
            </header>
        )
    }

    openParentCategory(currentlyActiveParentId) {

        // if categories are not loaded, then do nothing
        if (!this.state.isLoaded) {
            return
        }

        // subcategories of current parent category
        const sortedCategories = this.state.categories.filter(c => c.parent === currentlyActiveParentId)

        // get either id of the first item or -1 as a default value
        const id = sortedCategories[0]?.id || -1;

        // emulate click to the first subcategory in the list
        this.handleClick(id);

        // update all states
        this.setState({ sortedCategories, currentlyActiveParentId, isCategoryListExpanded: false })
    }


    handleClick(currentlyActiveId) {
        this.setState({ currentlyActiveId })

        // calls callback in App.js to load products of this category
        this.props.categoryWasChanged(currentlyActiveId, this.state.categories.find(c => c.id === currentlyActiveId)?.count || 0)
    }


    componentDidMount() {
        // load all categories
        this.apiService.getCategories((categories) => {

            categories = categories.map(c => {
                c.id = c.term_id
                return c
            })

            // by default we open first category
            // if array is empty we use -1
            let currentlyActiveId = categories[0]?.id || -1

            this.setState({
                categories,
                currentlyActiveId,
                isLoaded: true
            })

            // open first parent category
            this.openParentCategory(this.parentCategories[0].id)
        })
    }


    expandCategories() {
        // toggle expanding of the list
        this.setState({ isCategoryListExpanded: !this.state.isCategoryListExpanded })
    }
}

export default Header