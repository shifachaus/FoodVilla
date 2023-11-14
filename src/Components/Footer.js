import { Link } from "react-router-dom";
import Logo from "../assets/img/foodvillalogo.png";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="  bg-black text-neutral-100  ">
      <div className="mx-auto max-w-7xl  grid grid-cols-1 space-y-10 bg-primary px-5 py-8 pt-20  tracking-wider text-black md:grid-cols-4 md:space-y-0 xl:px-28 xl:py-20 ">
        <section className="space-y-4">
          <Link to="/" className="flex items-end">
            <img data-testid="logo" alt="logo" src={Logo} />
            <p className=" text-lg font-bold text-neutral-100 ">Food Villa</p>
          </Link>
          <p className="  text-neutral-100">
            {year} FoodVilla. All rights reverved
          </p>
        </section>

        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="capitalize text-neutral-100 text-lg font-medium">
              Company
            </h2>
          </div>
          <div className="flex flex-col space-y-4 text-sm font-light text-neutral-100">
            <a href="#" className="hover:text-white/80 text-white/70 text-sm">
              About
            </a>
            <a href="#" className="hover:text-white/80 text-white/70 text-sm">
              Careers
            </a>
            <a href="#" className="hover:text-white/80 text-white/70 text-sm">
              Team
            </a>
          </div>
        </section>

        <div className="space-y-4">
          <section className="space-y-4">
            <div className="space-y-1">
              <h2 className="capitalize text-neutral-100 text-lg font-medium">
                Contact us
              </h2>
            </div>
            <div className="flex flex-col space-y-4 text-sm font-light text-neutral-100">
              <a href="#" className="hover:text-white/80 text-white/70 text-sm">
                Help & Support
              </a>
              <a href="#" className="hover:text-white/80 text-white/70 text-sm">
                Partner with us
              </a>
              <a href="#" className="hover:text-white/80 text-white/70 text-sm">
                Ride with us
              </a>
            </div>
          </section>

          <section className="space-y-4">
            <div className="space-y-1">
              <h2 className="capitalize text-neutral-100 text-lg font-medium">
                Legal
              </h2>
            </div>
            <div className="flex flex-col space-y-4 text-sm font-light text-neutral-100">
              <a href="#" className="hover:text-white/80 text-white/70 text-sm">
                Terms & Conditions
              </a>
              <a href="#" className="hover:text-white/80 text-white/70 text-sm">
                Cookie Policy
              </a>
              <a href="#" className="hover:text-white/80 text-white/70 text-sm">
                Privacy Policy
              </a>
            </div>
          </section>
        </div>

        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="capitalize text-neutral-100 text-lg font-medium">
              We deliver to:
            </h2>
          </div>
          <div className="flex flex-col space-y-4 text-sm font-light text-neutral-100">
            <a href="#" className="hover:text-white/80 text-white/70 text-sm">
              Bangalore
            </a>
            <a href="#" className="hover:text-white/80 text-white/70 text-sm">
              Gurgaon
            </a>
            <a href="#" className="hover:text-white/80 text-white/70 text-sm">
              Hyderabad
            </a>
            <a href="#" className="hover:text-white/80 text-white/70 text-sm">
              Delhi
            </a>
            <a href="#" className="hover:text-white/80 text-white/70 text-sm">
              Mumbai
            </a>
            <a href="#" className="hover:text-white/80 text-white/70 text-sm">
              Pune
            </a>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
