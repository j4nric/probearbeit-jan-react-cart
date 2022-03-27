import React, { useState, useEffect } from "react";
import axios from "axios";
import "regenerator-runtime/runtime";

function Cart() {
  const [cartitems, setCartitems] = useState([]);
  const [moneytotal, setMoneytotal] = useState("");

  useEffect(() => {
    fetchCart();
  }, []);

  function refreshPage() {
    window.location.reload(false);
  }

  const fetchCart = async () => {
    const response = await fetch(
      "https://probearbeitdev-11.myshopify.com/cart.js"
    );
    const cartData = await response.json();
    setCartitems(cartData.items);
    setMoneytotal(cartData.total_price);
  };

  const changeCart = async (key, quantity) => {
    const data = { id: key, quantity: quantity };
    const response = await axios.post(
      "https://probearbeitdev-11.myshopify.com/cart/change.js",
      data
    );

    fetchCart();
    refreshPage();
  };

  const useCartitems = cartitems.map((cartitem) => {
    return (
      <div className="section clearfix" key={cartitem.id}>
        <div className="five columns alpha">
          <a className="cart_page_image">
            <img src={cartitem.image}></img>
          </a>
        </div>
        <div className="eleven columns omega cart_content_info">
          <h3>{cartitem.title}</h3>
          <p>Jahrgang: {cartitem.variant_title}</p>
          <p className="modal_price">
            <span className="money">{cartitem.price / 100 + "€"}</span>
          </p>

          <div className="left product-quantity-box">
            <span
              className="ss-icon product-minus js-change-quantity"
              data-func="minus"
              onClick={() => changeCart(cartitem.key, cartitem.quantity - 1)}
            >
              <span className="icon-minus"></span>
            </span>
            <input
              type="number"
              min="0"
              className="quantity"
              value={cartitem.quantity}
            />
            <span
              className="ss-icon product-plus js-change-quantity"
              data-func="plus"
              onClick={() => changeCart(cartitem.key, cartitem.quantity + 1)}
            >
              <span className="icon-plus"></span>
            </span>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="container">{cartitems && useCartitems}</div>
      <h1>Gesamtpreis: {moneytotal}</h1>
    </>
  );
}

export default Cart;
