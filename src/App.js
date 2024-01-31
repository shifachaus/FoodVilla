import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./Components/Header";

import Success from "./Components/Success";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Contact from "./Components/Contact";
import Error from "./Components/Error";
import RestaurantMenu from "./Components/RestaurantMenu";
import Shimmer from "./Components/Shimmer";
import { UserProvider } from "./Utils/UserContext";
import Footer from "./Components/Footer";
import { Provider } from "react-redux";
import store from "./Utils/store";
import Cart from "./Components/Cart";
import Search from "./Components/Search";
import { Auth0Provider } from "@auth0/auth0-react";

const Help = lazy(() => import("./Components/Help"));
const Body = lazy(() => import("./Components/Body"));

const AppLayoutComponent = () => {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      cacheLocation="localstorage"
    >
      <Provider store={store}>
        <div className="app">
          {/* Use CommonLayout for common elements */}
          <UserProvider>
            <Header />
            {/* Only Body should be the outlet */}
            <Outlet />
          </UserProvider>
        </div>
      </Provider>
    </Auth0Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayoutComponent />,
    children: [
      {
        path: "/",

        element: (
          <Suspense fallback={<Shimmer />}>
            <UserProvider>
              <Header />
              <Body />
              <Footer />
            </UserProvider>
          </Suspense>
        ),
      },
      {
        path: "/search",

        element: (
          <UserProvider>
            <Header />
            <Search />
          </UserProvider>
        ),
      },
      {
        path: "/contact",

        element: (
          <UserProvider>
            <Header />
            <Contact />
          </UserProvider>
        ),
      },
      {
        path: "/restaurant/:resId",

        element: (
          <UserProvider>
            <Header />
            <RestaurantMenu />
          </UserProvider>
        ),
      },
      {
        path: "/cart",

        element: (
          <UserProvider>
            <Header />
            <Cart />
          </UserProvider>
        ),
      },
      {
        path: "/success",

        element: (
          <UserProvider>
            <Header />
            <Success />
          </UserProvider>
        ),
      },
      {
        path: "/Help",

        element: (
          <Suspense fallback={<Shimmer />}>
            <UserProvider>
              <Header />
              <Help />
            </UserProvider>
          </Suspense>
        ),
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
