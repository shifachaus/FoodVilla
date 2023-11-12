import React, { useState } from "react";
import { useUserContext } from "../Utils/UserContext";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";

const SignIn = ({ onHover, setOnHover }) => {
  const { loginWithRedirect, myUser } = useUserContext();

  const { logout } = useUserContext();
  console.log(myUser, "SIGN IN");

  const handleToggle = () => {
    logout({ resizeTo: window.location.origin });
  };
  return (
    <li className="" onMouseOver={() => setOnHover(true)}>
      <div className="flex gap-2 items-center text-neutral-700 text-md font-medium hover:text-orange-500">
        <AiOutlineUser className="text-xl text-neutral-500 " />
        <button onClick={loginWithRedirect}>
          {myUser ? myUser?.given_name : "Sign in"}
        </button>
      </div>

      {myUser && onHover && (
        <div class="relative" onMouseLeave={() => setOnHover(false)}>
          <div
            id="dropdownHover"
            class={`absolute z-10 md:top-7 top-2  w-36  py-2 px-3  text-sm bg-white border-t-2 border-orange-500  shadow-md `}
          >
            <ul
              class=" text-sm text-gray-700   flex flex-col mx-auto "
              aria-labelledby="dropdownHoverButton"
            >
              <li>
                <Link
                  to="/"
                  className="block text-sm font-medium px-4 py-2 hover:text-orange-500"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="block text-sm font-medium px-4 py-2 hover:text-orange-500"
                >
                  Order
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="block text-sm font-medium px-4 py-2 hover:text-orange-500"
                >
                  Favourites
                </Link>
              </li>
              <li
                onClick={() => handleToggle()}
                className="block text-sm font-medium px-4 py-2 hover:text-orange-500 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      )}
    </li>
  );
};

export default SignIn;
