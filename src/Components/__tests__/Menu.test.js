import { MENU_DATA } from "../../mocks/data";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { StaticRouter } from "react-router-dom/server";
import { Provider } from "react-redux";
import store from "../../utils/store";
import RestaurantMenu from "../RestaurantMenu";
import Header from "../Header";

// dummy fetch
global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MENU_DATA);
    },
  });
});

test("Add items to cart", async () => {
  const body = render(
    <StaticRouter>
      <Provider store={store}>
        <Header />
        <RestaurantMenu />
      </Provider>
    </StaticRouter>
  );

  //load
  await waitFor(() => expect(body.getAllByTestId("menu")));
  const addBtn = body.getByTestId("add-btn");

  fireEvent.click(addBtn[0]);

  const cart = body.getByTestId("cart");
  expect(cart.innerHTML).toBe(0);
});
