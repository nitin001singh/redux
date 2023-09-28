import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Carts.module.css";
import { deleteAsync, updateAsync } from "./cartsSlice";

export function Carts() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleChange = (e, id) => {
    dispatch(updateAsync({ id, change: { quantity: +e.target.value } }));
  };

  return (
    <div>
      {items.map((item, index) => {
        return (
          <table key={index}>
            <tr>
              <td>
                <img
                  src={item.thumbnail}
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>
                <table>
                  <tr>
                    <td>Brand: {item.brand}</td>
                  </tr>
                  <tr>
                    <td>Product: {item.title}</td>
                  </tr>
                  <tr>
                    <td>Price: ${item.price}</td>
                  </tr>
                  <tr>
                    <td>
                      <select
                        name=""
                        id=""
                        value={item.quantity}
                        onChange={(e) => handleChange(e, item.id)}
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                      </select>
                    </td>
                  </tr>
                </table>
              </td>
              <td width={"50px"}>&nbsp;</td>
              <td onClick={() => dispatch(deleteAsync(item.id))}>Delete</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
            </tr>
          </table>
        );
      })}
    </div>
  );
}
