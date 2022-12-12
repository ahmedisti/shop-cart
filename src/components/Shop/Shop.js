import React, { useEffect, useState } from "react";
import { addToDb, getStoredCard } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
    const [products , setProducts] = useState([]);
    const[cart , setCart] = useState([]);


    useEffect(() => {
      // console.log('product load first before fetch');
        fetch('products.json')
        .then(res => res.json())
        .then(data => {
          setProducts(data)
          // console.log('products loaded');
        })
    },[]);

    // use data in the local storage thats why we are using this useEffect and we are import getStoredCart method form fakebd.js
    useEffect( () => {
      console.log('local storage first line');
      const storedCart = getStoredCard();
      const saveCart = [];
      for(const id in storedCart){
        const addedProduct = products.find(product => product.id === id);
        if(addedProduct){

          const quantity = storedCart[id];
          addedProduct.quantity = quantity;
          saveCart.push(addedProduct);
        }
        

      }

      setCart(saveCart);
      // console.log('local storage finished');
      
    } , [products])
    const handleAddToCart = (seletedProduct) => {
        console.log(seletedProduct);
        let newCart = []
        const exists = cart.find(product => product.id === seletedProduct.id);
        if(!exists){
          seletedProduct.quantity = 1;
          newCart = [...cart,seletedProduct];
        }
        else{
          const rest = cart.filter(product => product.id !== seletedProduct.id);
          exists.quantity = exists.quantity + 1;
          newCart = [...rest,exists]
        }
        
        setCart(newCart);
        addToDb(seletedProduct.id)
            }   

  return (
    <div className="shop-container">
      <div className="products-container">
        {
         products.map(product => <Product 
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
            ></Product>)   
        }
      </div>
      <div  className="cart-container">
        <Cart cart={cart}></Cart>
        </div>
    </div>
  );
};

export default Shop;
