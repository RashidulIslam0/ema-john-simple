import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    console.log(cart);
    // const totalPrice = cart.reduce((total,prd) => total+prd.price,0);
    // const total =cart.reduce( ( total,prd)=> total+prd.price ,0)
    let total=0;
    for(let i =0; i< cart.length; i++){
        const product = cart[i];
        total=total+product.price;
    }

    let shipping =0;
    if(total > 35){
        shipping=0;
    }
    else if (total > 15){
        shipping =4.99;
    }

    else if(total >0){
        shipping=10.99
    }

    const tex = Math.round(total/10).toFixed(2); 
    const grandTotal= total+shipping+Number(tex).toFixed(2)

    const formatNumber =num=>{
        const precision =num.toFixed(2);
        return Number(precision);
    }
    return (
        <div>
            <h1>Order Semmary</h1>
            <p>Items Ordered: {cart.length}</p>
            <p>Proudct Price:{formatNumber(total)}</p>
            <p><small>Shiiping Cost:{shipping}</small></p>
            <p><small>Tax+Vat:{tex}</small></p>
            <p>Total Price: {grandTotal}</p>
        </div>
    );
};

export default Cart;