import { useState, useContext } from "react";
// import { LOGO__URL } from "../Utils/constants";
import Logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { BiSolidOffer } from "react-icons/bi";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import { CgMenuRight } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import SignIn from "./SignIn";

const Header = () => {
  const [auth, setAuth] = useState(false);
  const [onHover, setOnHover] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  //subscribing to store here
  const cartItems = useSelector((store) => store.cart.item);

  return (
    <section className="flex  " onMouseLeave={() => setOnHover(false)}>
      <div className="fixed top-0 inset-x-0 z-50  bg-white  shadow-md">
        <div className=" flex justify-between items-center w-[90%] max-w-7xl mx-auto">
          <div className="logo__container">
            <Link to="/">
              <img data-testid="logo" className="w-24" alt="logo" src={Logo} />
            </Link>
          </div>

          <span
            className=" md:hidden cursor-pointer"
            onClick={() => setShowMenu(true)}
          >
            <CgMenuRight className="text-xl text-neutral-500 " />
          </span>

          {/* DESKTOP */}
          <nav className="hidden md:block">
            <ul className="flex gap-10">
              <li>
                <Link
                  to="/search"
                  className="flex gap-2 items-center text-neutral-700 text-md font-medium hover:text-orange-500"
                >
                  <FiSearch className="text-xl text-neutral-500 " /> Search
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="flex gap-2 items-center text-neutral-700 text-md font-medium hover:text-orange-500"
                >
                  <BiSolidOffer className="text-xl text-neutral-500 " /> Offers
                </Link>
              </li>

              <li>
                <Link
                  to="/Help"
                  className="flex gap-2 items-center text-neutral-700 text-md font-medium hover:text-orange-500"
                >
                  <IoMdHelpCircleOutline className="text-xl text-neutral-500 " />{" "}
                  Help
                </Link>
              </li>

              <SignIn onHover={onHover} setOnHover={setOnHover} />

              <li>
                <Link
                  to="/cart"
                  className="relative flex gap-2 items-center text-neutral-700 text-md font-medium "
                >
                  <span>
                    <svg
                      viewBox="-1 0 37 32"
                      height="20"
                      width="20"
                      fill={cartItems?.length > 0 ? "#60b246 " : "white"}
                      strokeWidth="2px"
                      stroke={cartItems?.length > 0 ? "#60b246 " : "#282c3f"}
                    >
                      <path d="M4.438 0l-2.598 5.11-1.84 26.124h34.909l-1.906-26.124-2.597-5.11z"></path>
                    </svg>
                    <span
                      className={`absolute top-[.68rem] left-[.38rem] transform  -translate-y-1/2 ${
                        cartItems?.length > 0 ? "text-white" : "text-black"
                      } text-sm`}
                    >
                      {cartItems?.length}
                    </span>
                  </span>

                  <span className="hover:text-orange-500">Cart</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* MOBILE */}
          <nav
            className={`z-50 fixed inset-y-0 right-0 overflow-y-auto bg-white px-6 py-6  w-60 h-screen transition-transform   ${
              showMenu ? "translate-x-1" : "translate-x-full"
            } `}
          >
            <span
              className=" md:hidden absolute right-9 top-8 cursor-pointer"
              onClick={() => setShowMenu(false)}
            >
              <RxCross1 className="text-xl text-neutral-500 " />
            </span>
            <ul className="flex flex-col gap-10 mt-16">
              <li className="cursor-pointer ">
                <Link
                  to="/search"
                  className="flex gap-2 items-center text-neutral-700 text-md font-medium hover:text-orange-500"
                >
                  <FiSearch className="text-xl text-neutral-500 " /> Search
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="flex gap-2 items-center text-neutral-700 text-md font-medium hover:text-orange-500"
                >
                  <BiSolidOffer className="text-xl text-neutral-500 " /> Offers
                </Link>
              </li>
              <li>
                <Link
                  to="/Help"
                  className="flex gap-2 items-center text-neutral-700 text-md font-medium"
                >
                  <IoMdHelpCircleOutline className="text-xl text-neutral-500 " />{" "}
                  Help
                </Link>
              </li>
              <SignIn onHover={onHover} setOnHover={setOnHover} />
              <li>
                <Link
                  to="/cart"
                  className="relative flex gap-2 items-center text-neutral-700 text-md font-medium hover:text-orange-500"
                >
                  <span>
                    <svg
                      viewBox="-1 0 37 32"
                      height="20"
                      width="20"
                      fill={cartItems?.length > 0 ? "green " : "white"}
                      strokeWidth="2px"
                      stroke={cartItems?.length > 0 ? "green " : "#282c3f"}
                    >
                      <path d="M4.438 0l-2.598 5.11-1.84 26.124h34.909l-1.906-26.124-2.597-5.11z"></path>
                    </svg>
                    <span
                      className={`absolute top-[.68rem] left-[.38rem] transform  -translate-y-1/2 ${
                        cartItems?.length > 0 ? "text-white" : "text-black"
                      } text-sm`}
                    >
                      {cartItems?.length}
                    </span>
                  </span>

                  <span className="hover:text-orange-500">Cart</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Header;
