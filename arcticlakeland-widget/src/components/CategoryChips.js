import React from "react";

export default class CategoryChips extends React.Component {
    
    constructor(props) {
        super(props)

        this.props = props
        this.state = {isActive: false}
    }
    
    render() {
        return (
            <div onClick={this.handleClick.bind(this)} className={`category-chips-item ${this.state.isActive ? 'active' : ''}`}>
                <span>{this.props.name}</span>
            </div>
        )
    }

    handleClick() {
        this.setState({isActive: true})
    }
}