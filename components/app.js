import React from "react";
import { render } from "react-dom";
import Cart from "./cart";
import MiniCart from "./minicart";

document.addEventListener("DOMContentLoaded", () => {
  const miniCartContainer = document.getElementById("react-minicart");
  const cartContainer = document.getElementById("react-cart");

  if (miniCartContainer) {
    render(<MiniCart />, miniCartContainer);
  }

  if (cartContainer) {
    render(<Cart />, cartContainer);
  }
});
