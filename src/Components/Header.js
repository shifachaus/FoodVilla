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

const Header = () => {
  const [auth, setAuth] = useState(false);
  const { user } = useContext(UserContext);

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
          <nav className="">
            <ul className="flex gap-10">
              {/* <p data-testid="online-status">{onlineStatus ? "🟢" : "🔴"}</p> */}

              <li>
                <Link
                  to="/search"
                  className="flex gap-2 items-center text-neutral-700 text-md font-medium"
                >
                  <FiSearch className="text-xl text-neutral-500" /> Search
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="flex gap-2 items-center text-neutral-700 text-md font-medium"
                >
                  <BiSolidOffer className="text-xl text-neutral-500" /> Offers
                </Link>
              </li>

              <li>
                <Link
                  to="/grocery"
                  className="flex gap-2 items-center text-neutral-700 text-md font-medium"
                >
                  <IoMdHelpCircleOutline className="text-xl text-neutral-500" />{" "}
                  Help
                </Link>
              </li>

              <li>
                <Link
                  to="/grocery"
                  className="flex gap-2 items-center text-neutral-700 text-md font-medium"
                >
                  <AiOutlineUser className="text-xl text-neutral-500" /> Sign In
                </Link>
              </li>
              <Link
                to="/cart"
                className="relative flex gap-2 items-center text-neutral-700 text-md font-medium"
              >
                <BsCart2 className="text-xl text-neutral-500 " />
                <span data-testid="cart " className="absolute -top-3 left-2">
                  {cartItems?.length}{" "}
                </span>
                <span>Cart</span>
              </Link>
              {/* <span className="p-10 font-bold text-red-900">{user?.name}</span>
            <button
              className="login"
              onClick={() => {
                setAuth(!auth);
              }}
            >
              {auth ? "logout" : "Login"}
            </button> */}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Header;
