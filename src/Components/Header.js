import { useState, useContext } from "react";
// import { LOGO__URL } from "../Utils/constants";
import Logo from "../assets/img/foodvilla.png";
import { Link } from "react-router-dom";
import useOnlineStatus from "../Utils/useOnlineStatus";
import UserContext from "../Utils/UserContext";
import { useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { BiSolidOffer } from "react-icons/bi";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import { CgMenuRight } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";

const Header = () => {
  const [auth, setAuth] = useState(false);
  const { user } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false);

  const onlineStatus = useOnlineStatus();

  //subscribing to store here
  const cartItems = useSelector((store) => store.cart.item);

  return (
    <section className="flex  ">
      <div className="fixed top-0 inset-x-0 z-50  bg-white  shadow-md">
        <div className=" flex justify-between items-center w-[90%] max-w-7xl mx-auto">
          <div className="logo__container">
            <Link to="/">
              <img data-testid="logo" className="w-32" alt="logo" src={Logo} />
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
                  <FiSearch className="text-xl text-neutral-500 hover:text-orange-500" />{" "}
                  Search
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="flex gap-2 items-center text-neutral-700 text-md font-medium hover:text-orange-500"
                >
                  <BiSolidOffer className="text-xl text-neutral-500 hover:text-orange-500" />{" "}
                  Offers
                </Link>
              </li>

              <li>
                <Link
                  to="/Help"
                  className="flex gap-2 items-center text-neutral-700 text-md font-medium hover:text-orange-500"
                >
                  <IoMdHelpCircleOutline className="text-xl text-neutral-500 hover:text-orange-500" />{" "}
                  Help
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="flex gap-2 items-center text-neutral-700 text-md font-medium hover:text-orange-500"
                >
                  <AiOutlineUser className="text-xl text-neutral-500 hover:text-orange-500" />{" "}
                  Sign In
                </Link>
              </li>
              <Link
                to="/cart"
                className="relative flex gap-2 items-center text-neutral-700 text-md font-medium hover:text-orange-500"
              >
                <BsCart2 className="text-xl text-neutral-500 hover:text-orange-500" />
                <span data-testid="cart " className="absolute -top-3 left-2">
                  {cartItems?.length}{" "}
                </span>
                <span>Cart</span>
              </Link>
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
              {/* <p data-testid="online-status">{onlineStatus ? "🟢" : "🔴"}</p> */}

              <li className="cursor-pointer ">
                <Link
                  to="/search"
                  className="flex gap-2 items-center text-neutral-700 text-md font-medium hover:text-orange-500"
                >
                  <FiSearch className="text-xl text-neutral-500 hover:text-orange-500" />{" "}
                  Search
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="flex gap-2 items-center text-neutral-700 text-md font-medium hover:text-orange-500"
                >
                  <BiSolidOffer className="text-xl text-neutral-500 hover:text-orange-500" />{" "}
                  Offers
                </Link>
              </li>

              <li>
                <Link
                  to="/Help"
                  className="flex gap-2 items-center text-neutral-700 text-md font-medium hover:text-orange-500"
                >
                  <IoMdHelpCircleOutline className="text-xl text-neutral-500 hover:text-orange-500" />{" "}
                  Help
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="flex gap-2 items-center text-neutral-700 text-md font-medium hover:text-orange-500"
                >
                  <AiOutlineUser className="text-xl text-neutral-500 hover:text-orange-500" />{" "}
                  Sign In
                </Link>
              </li>
              <Link
                to="/cart"
                className="relative flex gap-2 items-center text-neutral-700 text-md font-medium hover:text-orange-500"
              >
                <BsCart2 className="text-xl text-neutral-500 hover:text-orange-500 " />
                <span data-testid="cart " className="absolute -top-3 left-2">
                  {cartItems?.length}{" "}
                </span>
                <span>Cart</span>
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Header;
