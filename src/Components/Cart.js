import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, addItem, removeItem } from "../Utils/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.item);
  // console.log(cartItems, "CART ITEMS ");
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const addQty = (item) => {
    dispatch(addItem(item));
  };

  const removeQty = (item) => {
    dispatch(removeItem(item));
  };

  let total = cartItems?.reduce((acc, cur) => {
    return acc + (cur?.card?.info?.price / 100) * cur.qty;
  }, 0);

  return (
    <div className=" w-[90%] max-w-7xl my-0 mx-auto mt-6  mb-4 ">
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center gap-2 h-screen mt-28">
          <p className="text-lg font-medium">Your cart is empty</p>
          <p>You can go to home page to view more restaurants</p>
          <Link to={"/"} className="bg-black text-white p-2 px-4 rounded">
            SEE RESTAURANTS NEAR YOU
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-2 mt-4 md:w-9/12 m-auto  bg-slate-50 h-screen">
          <div className="flex justify-end">
            <button
              className="bg-black text-white p-2 px-4 rounded w-32 "
              onClick={() => handleClearCart()}
            >
              Clear cart
            </button>
          </div>
          {cartItems?.map((item) => {
            return (
              <div
                key={item?.card?.info?.id}
                className="grid grid-cols-3 border-b-2 p-4 gap-4 items-center"
              >
                <p>{item?.card?.info?.name}</p>
                <div className="flex items-center justify-center  gap-4 ">
                  <button className="" onClick={() => removeQty(item)}>
                    -
                  </button>
                  <span>{item?.qty}</span>
                  <button className="" onClick={() => addQty(item)}>
                    +
                  </button>
                </div>

                <p className="text-right">
                  {" "}
                  ₹
                  {item?.card?.info?.price
                    ? item?.card?.info?.price / 100
                    : item?.card?.info?.defaultPrice / 100}
                </p>
              </div>
            );
          })}

          <div className="grid grid-cols-2 items-center p-4">
            <p className="font-medium">TO PAY </p>
            <p className="text-right font-medium">₹{total}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
