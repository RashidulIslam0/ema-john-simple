import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'

const Product = (props) => {
    // console.log(props);
    const { name, img, seller, price, stock, star } = props.product;
    return (
        <div className="product">
            <div>
                <img src={img}  alt="" />
            </div>
            <div >
                <h4 className='product-name'>{name}</h4>
                <br />
                <p><small>by:{seller}</small></p>
                <p>${price}</p>
                <br />
                <p><small>Only{stock} laft in stock -Order soon </small></p>
                <button className="main-button"
                  onClick={()=>props.hendleAddProduct(props.product)}
                > 
                 <FontAwesomeIcon icon={faShoppingCart} />
                 add to cart
                 
                 </button>
            </div>
           
        </div>
    );
};

export default Product;