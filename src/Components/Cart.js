import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, addItem, removeItem } from "../Utils/cartSlice";
import { Link } from "react-router-dom";
import { CDN__URL } from "../Utils/constants";

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
    console.log(cur?.card?.info, "TOTAL");
    return acc + (cur?.card?.info?.defaultPrice / 100) * cur.qty;
  }, 0);

  return (
    <div className=" w-[90%] max-w-7xl my-0 mx-auto    mb-4 ">
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center gap-6 h-screen justify-center">
          <div className="flex flex-col items-center gap-2">
            <p className="text-lg font-bold text-neutral-700">
              Your cart is empty
            </p>
            <p className="text-xs text-neutral-500">
              You can go to home page to view more restaurants
            </p>
          </div>
          <Link to={"/"} className="bg-orange-500 text-white p-2 px-4 ">
            SEE RESTAURANTS NEAR YOU
          </Link>
        </div>
      ) : (
        <div className="flex flex-col md:grid md:grid-flow-col gap-6 md:w-9/12 mx-auto mt-32  h-screen">
          <div className="col-span-8">
            {cartItems?.map((item) => {
              return (
                <div
                  key={item?.card?.info?.id}
                  className="grid grid-cols-3 border-b-2 p-4 gap-4 items-center  "
                >
                  <div>
                    <img
                      src={CDN__URL + item?.card?.info?.imageId}
                      alt="image"
                      className="w-20 h-14  object-cover object-center  rounded-md  "
                    />
                    <p>{item?.card?.info?.name}</p>
                  </div>
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
          </div>
          <div className="md:mt-6  col-span-4">
            <p className="text-md font-medium">Bill Details </p>
            <div className="flex justify-between py-1">
              <p className="text-xs text-neutral-500">Item Total </p>
              <p className="text-xs text-neutral-500">₹{total}</p>
            </div>
            <div className="flex justify-between pt-2 pb-4 border-b border-black">
              <p className="text-xs text-neutral-500 ">
                GST and Restaurant Charges{" "}
              </p>
              <p className="text-xs text-neutral-500">₹ 70.51</p>
            </div>
            <div className="flex justify-between py-2 ">
              <p className="text-sm font-medium ">TO PAY </p>
              <p className="text-sm font-medium">₹{total + 70.51}</p>
            </div>

            <div className="flex justify-end md:justify-between mt-8">
              <div className="pr-2">
                <button
                  className="bg-neutral-100 text-black p-2 px-4 rounded w-32 "
                  onClick={() => handleClearCart()}
                >
                  Clear cart
                </button>
              </div>
              <div className="">
                <button
                  className="bg-orange-400 text-white p-2 px-4 rounded w-32 "
                  // onClick={() => handleClearCart()}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
