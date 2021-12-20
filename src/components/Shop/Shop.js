import React, { useState } from 'react';
import fakeData from '../../fakeData'
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
const Shop = () => {
   const first10 =fakeData.slice(0,10);
   const [products,setProducts] =useState(first10);
   const [cart,setCart]= useState([]);
   

   const  hendleAddProduct =(product) =>{
    //    console.log("product added",product);
       const newCart=[...cart,product];
   setCart(newCart);
   }

    return (
        <div className='shop-container'>
            {/* <Shop/> */}
            <div className="product-container">
                {
                    products.map(pd =>
                         <Product
                         hendleAddProduct={hendleAddProduct}
                          product={pd}
                          />
                     )
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}/>
            </div>
        
        </div>
    );
};

export default Shop;