import React from "react";

import './CategoryChips.scss';

export default class CategoryChips extends React.Component {
    
    constructor(props) {
        super(props)

        this.props = props
        this.state = {isActive: false}
    }
    
    render() {
        return (
            <div onClick={this.handleClick.bind(this)} className={`category-chips-item ${this.props.currentlyActive === this.props.id ? 'active' : ''}`}>
                <span>{this.props.name}</span>
            </div>
        )
    }

    handleClick() {
        // trigger callback in Header component
        this.props.clickHandler(this.props.id)
    }
}