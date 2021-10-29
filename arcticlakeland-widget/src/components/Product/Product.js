import React from "react";

import './Product.scss';

export class Product extends React.Component {

    render() {

        const fields = {
            region: this.props.product.fields?.region,
            price: this.props.product.fields?.price,
            description: this.props.product.fields?.description,
            image: this.props.product.fields?.image,
            title: this.props.product.title.rendered
        }

        // get value of src attribute of html element
        var regex = /<img.*?src="(.*?)"/
        fields.image = regex.exec(fields.image)?.[1] || ''

        return (
            <div className="product-tile-wrapper">
                <div className="product-tile-container" onClick={this.openProductPage.bind(this)}>
                    <div className="image-container"
                        style={{ backgroundImage: `url(${fields.image})` }}
                    >
                        {fields.price && <div className="price-tag">
                            <span>{fields.price}€</span>
                        </div>}
                    </div>
                    <div className="info-container">
                        <span className="product-region" dangerouslySetInnerHTML={{ __html: fields.region }}></span>
                        <span className="product-title" dangerouslySetInnerHTML={{ __html: fields.title }}></span>
                        <span className="product-description" dangerouslySetInnerHTML={{ __html: fields.description }}></span>
                    </div>
                </div>
                <div className="open-button-container">
                    <a href={this.props.product.link} className="open-tile-button-link">Tutustu</a>
                </div>
            </div>

        )
    }

    openProductPage() {
        window.open(this.props.product.link, '_blank')
    }

}