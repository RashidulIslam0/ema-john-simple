import React, { useState } from 'react';
import fakeData from '../../fakeData'
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';

const Shop = () => {
   const first10 =fakeData.slice(0,10);
   const [products,setProducts] =useState(first10);
   const [cart,setCart]= useState([]);
   
   useState(()=>{
    const savedCart =getDatabaseCart([]);
    const productKeys=Object.keys(savedCart);
    const proviouxCart=productKeys.map(pdkey=>{
        const product=fakeData.find(pd=>pd.key ===pdkey);
        product.quantity=savedCart[pdkey];
        return product;
    })
    setCart(proviouxCart)
    // console.log(proviouxCart);
   },[])


   const  hendleAddProduct =(product) =>{
    //    console.log("product added",product);
    //    const newCart=[...cart,product];
//    setCart(newCart);
const toBeAddedKey=product.key


   const semeProduct =cart.find(pd=>pd.key===toBeAddedKey)
  let count = 1;
 let newCart;
   if (semeProduct){
     count= semeProduct.quantity +1;
     semeProduct.quantity=semeProduct.quantity+1;
     const others=cart.filter(pd=>pd.key !== toBeAddedKey )
    newCart =[...others,semeProduct]
    }
    else{
        product.quantity = 1;
        newCart = [...cart, product];
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count);
   }

    return (
        <div className='twin-container'>
            {/* <Shop/> */}
            <div className="product-container">
                {
                    products.map(pd =>
                       
                         <Product
                         key={pd.key}
                         showAddToCart={true}
                         hendleAddProduct={hendleAddProduct}
                          product={pd}
                          />
                     )
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}/>
                <Link to="/review">
            <button className='main-button'> Review Order</button>

            </Link>
            </div>
        
        </div>
    );
};

export default Shop;