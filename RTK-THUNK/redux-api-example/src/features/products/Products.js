import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsync } from "./productsSlice";
import styles from "./Products.module.css";
import { addAsync } from "../cart/cartsSlice";

export function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  useEffect(()=>{
    dispatch(fetchAsync())
  }, [])
  return (
    <div>
      {products.map((product, index) => {
        return(
          <div className={styles.card} key={index}>
          <img
            src={product.thumbnail}
            alt={product.title}
            style={{ width: "100%" }}
          />
          <h1>{product.title}</h1>
          <p className={styles.price}>${product.price}</p>
          <p>{product.description}</p>
          <p>
            <button onClick={()=>dispatch(addAsync(product))}>Add to Cart</button>
          </p>
        </div>
        )
      })}
    </div>
  );
}
