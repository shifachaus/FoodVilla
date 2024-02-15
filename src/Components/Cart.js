import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, addItem, removeItem } from "../Utils/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { CDN__URL } from "../Utils/constants";
import { useUserContext } from "../Utils/UserContext";

const Cart = () => {
  const { loginWithRedirect, myUser } = useUserContext();
  const cartItems = useSelector((store) => store.cart.item);
  const restaurantData = useSelector((store) => store.cart.restaurant);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    return acc + (cur?.price / 100) * cur.qty;
  }, 0);

  const handleCheckout = () => {
    if (myUser) {
      navigate("/success");
    } else {
      loginWithRedirect();
    }
  };

  return (
    <section className=" mt-16 ">
      <div className=" w-[90%] max-w-7xl my-0 mx-auto  mb-4 ">
        {cartItems.length === 0 && (
          <div className="flex flex-col items-center gap-6 h-screen justify-center ">
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
        )}
        {cartItems.length > 0 && (
          <>
            {" "}
            <div className="flex items-center gap-2  md:w-9/12 mx-auto pt-16 pb-4 ">
              <img
                src={CDN__URL + restaurantData?.imageID}
                alt="image"
                className="w-20 h-14  object-cover object-center  rounded-md  "
              />
              <div>
                <p className="font-medium text-md">{restaurantData?.resName}</p>
                <p className="text-neutral-500 text-xs">
                  {restaurantData?.areaName}
                </p>
              </div>
            </div>
            <div className="flex flex-col md:grid md:grid-flow-col gap-6 md:w-9/12 mx-auto   h-screen ">
              <div className="col-span-8">
                {cartItems?.map((item) => {
                  console.log(item);
                  return (
                    <div
                      key={item?.id}
                      className="grid grid-cols-3 border-b-2 p-4 gap-4 items-center  "
                    >
                      <p className="text-neutral-800 text-sm ">
                        {item?.itemName}
                      </p>
                      <div className="flex items-center justify-center  gap-4 ">
                        <button
                          className="  font-medium text-sm "
                          onClick={() => removeQty(item)}
                        >
                          -
                        </button>
                        <span className="text-green-600  font-medium text-sm">
                          {item?.qty}
                        </span>
                        <button
                          className="text-green-600 font-medium"
                          onClick={() => addQty(item)}
                        >
                          +
                        </button>
                      </div>

                      <p className="text-neutral-700 text-[13px] text-right">
                        {" "}
                        ₹
                        {item?.price
                          ? item?.price / 100
                          : item?.defaultPrice / 100}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="  col-span-4">
                <p className="text-md font-medium">Bill Details </p>
                <div className="flex justify-between py-1">
                  <p className="text-xs text-neutral-600">Item Total </p>
                  <p className="text-xs text-neutral-700">₹{total}</p>
                </div>
                <div className="flex justify-between pt-2 pb-4 border-b border-black">
                  <p className="text-xs text-neutral-600 ">
                    GST and Restaurant Charges{" "}
                  </p>
                  <p className="text-xs text-neutral-700">₹ 70.51</p>
                </div>
                <div className="flex justify-between py-2 ">
                  <p className="text-sm font-medium ">TO PAY </p>
                  <p className="text-sm font-medium">
                    ₹{(total + 70.51).toFixed(2)}
                  </p>
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
                      onClick={() => handleCheckout()}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
