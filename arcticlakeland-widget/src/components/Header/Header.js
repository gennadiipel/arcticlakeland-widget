import React from "react";

import preloader from './../../assets/preloader.gif'

import APIService from "../../services/APIService";
import CategoryChips from "../CategoryChips/CategoryChips";

import './Header.scss';

class Header extends React.Component {

    constructor() {
        super()

        this.apiService = new APIService()

        // currentlyActiveId is used to store which category is currently selected
        // categories is an originaly loaded categories
        // sortedCategories is a result of sort by parent category

        this.state = {
            categories: [],
            sortedCategories: [],
            currentlyActiveId: -1,
            currentlyActiveParentId: -1,
            isCategoryListExpanded: false,
            isLoaded: false
        }

        this.parentCategories = [
            { id: 30, title: 'Majoitu' },
            { id: 28, title: 'Näe ja koe' },
            { id: 32, title: 'Syö ja juo' },
        ]
    }

    render() {

        // show either preloader or categories
        // we pass name, id and currentlyActiveId to category item component

        let displayedCategories = !this.state.isCategoryListExpanded ? this.state.sortedCategories.slice(0, 10) : [...this.state.sortedCategories]

        let categories = (this.state.isLoaded) ?
            displayedCategories.map(c => (
                <CategoryChips clickHandler={this.handleClick.bind(this)} name={c.name} id={c.id} key={c.id} currentlyActive={this.state.currentlyActiveId}></CategoryChips>
            )) :
            <img className="preloader-image" src={preloader} alt='Loading...'></img>;

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
                                    className={`parent-category-title ${this.state.currentlyActiveParentId == el.id ? 'active' : ''}`}
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

        if (!this.state.isLoaded) {
            return
        }


        const sortedCategories = this.state.categories.filter(c => c.parent === currentlyActiveParentId)

        const id = sortedCategories[0]?.id || -1;

        this.handleClick(id);

        this.setState({ sortedCategories, currentlyActiveParentId, isCategoryListExpanded: false })
    }


    handleClick(currentlyActiveId) {
        this.setState({ currentlyActiveId })

        this.props.categoryWasChanged(currentlyActiveId)
    }


    componentDidMount() {
        this.apiService.getCategories((categories) => {

            // by default we open first category
            // if array is empty we use -1
            let currentlyActiveId = categories[0]?.id || -1

            // load products from default category
            //this.props.categoryWasChanged(currentlyActiveId)

            this.setState({
                categories,
                currentlyActiveId,
                isLoaded: true
            })

            this.openParentCategory(this.parentCategories[0].id)
        })
    }


    expandCategories() {
        this.setState({ isCategoryListExpanded: !this.state.isCategoryListExpanded })
    }
}

export default Header